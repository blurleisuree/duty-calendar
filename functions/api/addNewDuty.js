const { onRequest } = require("firebase-functions/v2/https");
const logger  = require("firebase-functions/logger");
const admin = require("firebase-admin");
const XLSX = require("xlsx");
const Busboy = require("busboy");
const os = require("os");
const path = require("path");
const fs = require("fs");

const convertToISODate = (dateValue) => {
  let date;
  
  // Если dateValue — число (серийный номер Excel)
  if (typeof dateValue === "number") {
    const excelEpoch = new Date(1899, 11, 30); // Начало отсчета в Excel
    date = new Date(excelEpoch.getTime() + dateValue * 24 * 60 * 60 * 1000);
  }

  // Если формат неизвестен, возвращаем null
  else {
    return null;
  }

  // Преобразуем в ISO-формат "YYYY-MM-DD"
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`; // Например, "2024-12-29"
};

const addNewDuty = onRequest({ cors: true, region: "europe-north1"  }, (req, res) => {
  if (req.method !== "POST") {
    logger.error("Method not allowed", { method: req.method });
    return res.status(405).json({ error: "Method not allowed" });
  }

  const busboy = Busboy({ headers: req.headers });
  let fileData = null;
  let filePath = null;

  busboy.on("file", (fieldname, file, filename) => {
    if (!filename.filename.endsWith(".xlsx")) {
      logger.error("File must be an Excel (.xlsx)", { filename: filename.filename });
      return res.status(400).json({ error: "File must be an Excel (.xlsx)" });
    }

    filePath = path.join(os.tmpdir(), filename.filename);
    const writeStream = fs.createWriteStream(filePath);
    file.pipe(writeStream);

    const buffers = [];
    file.on("data", (data) => buffers.push(data));
    file.on("end", () => {
      fileData = Buffer.concat(buffers);
    });
  });

  busboy.on("finish", async () => {
    try {
      const workbook = XLSX.read(fileData, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });

      // Пропускаем заголовок (1-я строка) и обрабатываем данные
      const duties = data.slice(1).map((row) => ({
        organization: row[0] ?? null,
        date: row[1] ? convertToISODate(row[1]) : null, // Конвертируем дату в ISO-формат
        timeStart: row[2] ?? null,
        timeEnd: row[3] ?? null, 
        fullName: row[4] ?? null,
        position: row[5] ?? null,
        phone: row[6] ?? null,
      }));

      // Удаляем старые данные из коллекции duties
      const collectionRef = admin.firestore().collection("duties");
      const snapshot = await collectionRef.get();
      const batch = admin.firestore().batch();

      // Удаляем все документы из коллекции
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Добавляем новые данные
      duties.forEach((duty) => {
        const docRef = collectionRef.doc();
        batch.set(docRef, duty);
      });

      // Выполняем batch-операцию
      await batch.commit();
      logger.info("Data uploaded successfully", { count: duties.length });

      // Удаляем временный файл
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      res.status(200).json({ success: true, message: "Данные успешно обновлены" });
    } catch (error) {
      logger.error("Error processing file", { error: error.message });
      res.status(500).json({ success: false, error: "Failed to process file" });
    }
  });

  busboy.end(req.rawBody);
});

module.exports = addNewDuty;