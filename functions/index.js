const admin = require("firebase-admin");

// Инициализация admin должна быть первой
admin.initializeApp();

// Импортируем функции
const { getDuties } = require("./api/getDuties");
const { addNewDuty } = require("./api/addNewDuty");
const { checkPassword } = require("./api/checkPassword");
const { checkAdminPassword } = require("./api/checkAdminPassword");

// Экспортируем функции
exports.getDuties = getDuties;
exports.addNewDuty = addNewDuty;
exports.checkPassword = checkPassword;
exports.checkAdminPassword = checkAdminPassword;