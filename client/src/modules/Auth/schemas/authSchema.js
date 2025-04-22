import * as Yup from "yup";

const passwordField = Yup.string()
  .min(5, "Пароль должен быть не менее 5-ти символов")
  .max(15, "Пароль должен быть не более 15-ти символов")
  .required("Пароль обязателен")
  .matches(
    /^(?=.*[A-Za-zА-Яа-яЁё])(?=.*\d)[A-Za-zА-Яа-яЁё\d]{5,}$/,
    "Пароль должен состоять из букв и цифр"
  );

const universalSchema = (formType) => {
  const fields = {};

  if (["login", "registration", "resetPassword"].includes(formType)) {
    fields.password = passwordField;
  }

  return Yup.object().shape(fields);
};

export default universalSchema