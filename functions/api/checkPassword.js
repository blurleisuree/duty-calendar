const { onCall, HttpsError } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}

exports.checkPassword = onCall({ region: "europe-north1" }, async (data, context) => {
  logger.info("Received data:", { data });

  if (!data || typeof data !== "object") {
    logger.warn("Data is not an object", { data });
    throw new HttpsError("invalid-argument", "Данные должны быть объектом");
  }

  const password = data.data ? data.data.password : undefined;
  logger.info("Extracted password:", { password });

  if (password == null || typeof password !== "string" || password.trim() === "") {
    logger.warn("Invalid password parameter", { password });
    throw new HttpsError("invalid-argument", "Пароль должен быть непустой строкой");
  }

  try {
    logger.info("Checking password...");
    const passwordDoc = await admin.firestore().collection("appSettings").doc("Ghe394qUWo4WdeEM7dMH").get();
    if (!passwordDoc.exists) {
      logger.error("Password document not found");
      throw new HttpsError("not-found", "Пароль не настроен");
    }

    const correctPassword = passwordDoc.data().password; 
    if (!correctPassword) {
      logger.error("Password value not found in document");
      throw new HttpsError("internal", "Пароль не настроен корректно");
    }

    if (password === correctPassword) {
      logger.info("Password check successful");
      return { success: true };
    } else {
      logger.warn("Invalid password provided");
      throw new HttpsError("unauthenticated", "Неверный пароль");
    }
  } catch (error) {
    logger.error("Error checking password:", { error: error.message, stack: error.stack });
    throw new HttpsError("internal", error.message || "Внутренняя ошибка сервера");
  }
});