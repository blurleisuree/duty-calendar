const { onRequest } = require("firebase-functions/v2/https");
const logger  = require("firebase-functions/logger");
const admin = require("firebase-admin");
const XLSX = require("xlsx");
const Busboy = require("busboy");
const os = require("os");
const path = require("path");
const fs = require("fs");

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
      // Парсим Excel
      const workbook = XLSX.read(fileData, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        raw: false,
        dateNF: "dd.mm.yy", // Формат даты
        cellDates: true, // Убедимся, что даты парсятся как даты
      });

      // Пропускаем заголовок (1-я строка) и обрабатываем данные
      const duties = data.slice(1).map((row) => ({
        organization: row[0] ?? null,
        date: row[1] ? String(row[1]).replace(/\//g, ".") : null, // Заменяем слэши на точки
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

      res.status(200).json({ success: true, message: "Old data removed and new data uploaded to Firestore" });
    } catch (error) {
      logger.error("Error processing file", { error: error.message });
      res.status(500).json({ success: false, error: "Failed to process file" });
    }
  });

  busboy.end(req.rawBody);
});

module.exports = addNewDuty;