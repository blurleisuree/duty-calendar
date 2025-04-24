const express = require("express");
const admin = require("firebase-admin");

// Инициализация Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для парсинга JSON
app.use(express.json());

// Эндпоинт для назначения роли пользователю
app.post("/set-role", async (req, res) => {
  const { email, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ error: "Email and role are required" });
  }

  try {
    // Находим пользователя по email
    const user = await admin.auth().getUserByEmail(email);
    // Назначаем Custom Claim с ролью
    await admin.auth().setCustomUserClaims(user.uid, { role });
    res.status(200).json({ success: true, message: `Role ${role} set for user ${email}` });
  } catch (error) {
    console.error("Error setting role:", error);
    res.status(500).json({ error: `Failed to set role: ${error.message}` });
  }
});

// Эндпоинт для получения роли пользователя
app.get("/get-role", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const user = await admin.auth().getUserByEmail(email);
    const token = await admin.auth().createCustomToken(user.uid);
    const tokenResult = await admin.auth().verifyIdToken(token);
    const role = tokenResult.role || "No role assigned";
    res.status(200).json({ email, role });
  } catch (error) {
    console.error("Error getting role:", error);
    res.status(500).json({ error: `Failed to get role: ${error.message}` });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});