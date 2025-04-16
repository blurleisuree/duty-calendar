const { onRequest } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/logger");
const admin = require("firebase-admin");

const getDuties = onRequest({ cors: true, region: "europe-north1" }, 
  async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection("duties").get();
    const duties = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json({ success: true, data: duties });
  } catch (error) {
    logger.error("Error fetching duties:", { error: error.message });
    res.status(500).json({ success: false, error: "Failed to fetch duties" });
  }
});

module.exports = getDuties;