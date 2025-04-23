const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger"); // Изменяем импорт
const admin = require("firebase-admin");
const XLSX = require("xlsx");
const Busboy = require("busboy");
const os = require("os");
const path = require("path");
const fs = require("fs");
const cors = require("cors")({ origin: true });

if (!admin.apps.length) {
  admin.initializeApp();
}

exports.convertToISODate = (dateValue) => {
  let date;

  if (typeof dateValue === "number") {
    const excelEpoch = new Date(1899, 11, 30);
    date = new Date(excelEpoch.getTime() + dateValue * 24 * 60 * 60 * 1000);
  } else {
    return null;
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

exports.addNewDuty = onRequest(
  { region: "europe-north1" },
  (req, res) => {
    cors(req, res, () => {
      // Проверяем, что logger доступен
      if (!logger || typeof logger.info !== "function") {
        console.error("Logger is not available");
        return res.status(500).json({ success: false, error: "Internal server error: Logger unavailable" });
      }

      logger.info("addNewDuty function triggered", { method: req.method });

      if (req.method !== "POST") {
        logger.error("Method not allowed", { method: req.method });
        return res.status(405).json({ error: "Method not allowed" });
      }

      const busboy = Busboy({ headers: req.headers });
      let fileData = null;
      let filePath = null;

      busboy.on("file", (fieldname, file, filename) => {
        logger.info("Processing file", { fieldname, filename: filename.filename });

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
          logger.info("File data received", { size: fileData?.length || 0 });
        });
      });

      busboy.on("error", (error) => {
        logger.error("Busboy error:", { error: error.message });
        res.status(500).json({ success: false, error: "Failed to process file: Busboy error" });
      });

      busboy.on("finish", async () => {
        logger.info("Busboy finished processing");

        try {
          if (!fileData) {
            logger.error("No file data received");
            return res.status(400).json({ success: false, error: "No file data received" });
          }

          logger.info("Reading XLSX file...");
          const workbook = XLSX.read(fileData, { type: "buffer" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
          });

          logger.info("Processing XLSX data", { rowCount: data.length });
          const duties = data.slice(1).map((row) => ({
            organization: row[0] ?? null,
            date: row[1] ? exports.convertToISODate(row[1]) : null,
            timeStart: row[2] ?? null,
            timeEnd: row[3] ?? null,
            fullName: row[4] ?? null,
            position: row[5] ?? null,
            phone: row[6] ?? null,
          }));

          logger.info("Writing to Firestore...");
          const collectionRef = admin.firestore().collection("duties");
          const snapshot = await collectionRef.get();
          const batch = admin.firestore().batch();

          snapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
          });

          duties.forEach((duty) => {
            const docRef = collectionRef.doc();
            batch.set(docRef, duty);
          });

          await batch.commit();
          logger.info("Data uploaded successfully", { count: duties.length });

          if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            logger.info("Temporary file deleted", { filePath });
          }

          res.status(200).json({ success: true, message: "Данные успешно обновлены" });
        } catch (error) {
          logger.error("Error processing file:", { error: error.message, stack: error.stack });
          res.status(500).json({ success: false, error: `Failed to process file: ${error.message}` });
        }
      });

      logger.info("Starting Busboy processing", { rawBodyLength: req.rawBody?.length || 0 });
      busboy.end(req.rawBody);
    });
  }
);