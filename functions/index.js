const admin = require("firebase-admin");

admin.initializeApp();

const addNewDuty = require("./api/addNewDuty");
const getDuties = require("./api/getDuties");

exports.addNewDuty = addNewDuty;
exports.getDuties = getDuties;