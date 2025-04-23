const admin = require("firebase-admin");

// Инициализация admin должна быть первой
admin.initializeApp();

// Импортируем функции
const { getDuties } = require("./api/getDuties");
const { addNewDuty } = require("./api/addNewDuty");

// Экспортируем функции
exports.getDuties = getDuties;
exports.addNewDuty = addNewDuty;