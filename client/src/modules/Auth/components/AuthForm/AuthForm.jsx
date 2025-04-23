import { useState } from "react";
import Button from "../../../../shared/components/UI/Button/Button";
import PassInput from "../../../../shared/components/UI/PassInput/PassInput";
import useAuthForm from "../../../../shared/hooks/useAuthForm";
import useAuthStore from "../../store/authStore";

import universalSchema from "../../schemas/authSchema";

function AuthForm() {
  const { login, loading, error } = useAuthStore();

  const { register, handleSubmit, reset, errors } = useAuthForm({
    formType: "login",
    mode: "onBlur",
    universalSchema: universalSchema,
  });

  const [sumbitErrors, setSubmitErrors] = useState(null);
  const onSubmit = async (data) => {
    setSubmitErrors(null);
    try {
      if (isAdmin) {
        await login(data.password, 'admin');
        return
      }
      await login(data.password);
      reset();
    } catch (e) {
      console.error("Error in AuthForm:", error);
      setSubmitErrors(e.message);
    }
  };

  const [isAdmin, setIsAdmin] = useState(false);
  const toggleIsAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <form
      className="px-5 pt-8 pb-15 mt-7 border rounded-3xl border-line w-full max-w-96"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-center text-2xl">Вход</h2>
      <PassInput
        name="password"
        register={register}
        errors={errors.password}
        className="mt-7"
      >
        Пароль
      </PassInput>
      {/* disabled={loading} */}
      <Button type="submit" className="w-full py-3 mt-4">
        Войти
      </Button>
      <span className="text-sm mt-3 block text-red-600">{sumbitErrors}</span>
      <p
        className="mt-5 text-center text-active underline-1 underline"
        onClick={toggleIsAdmin}
      >
        {isAdmin
          ? "Войти как обычный пользователь"
          : " Войти как администратор"}
      </p>
    </form>
  );
}

export default AuthForm;
