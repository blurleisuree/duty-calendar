import useAuthForm from "../../../../shared/hooks/useAuthForm";
import universalSchema from "../../../Auth/schemas/authSchema";
import PassInput from "../../../../shared/components/UI/PassInput/PassInput";
import Button from "../../../../shared/components/UI/Button/Button";

import { useState } from "react";
import useAdminStore from "../../store/adminStore";

function AdminAuth() {
  const { loading, error, checkPassword } = useAdminStore();

  const { register, handleSubmit, reset, errors } = useAuthForm({
    formType: "login",
    mode: "onBlur",
    universalSchema: universalSchema,
  });

  const [sumbitErrors, setSubmitErrors] = useState(null);
  const onSubmit = async (data) => {
    setSubmitErrors(null);
    try {
      await checkPassword(data.password);
      reset();
    } catch (e) {
      console.error("Error in AuthForm:", error);
      setSubmitErrors(e.message);
    }
  };

  return (
    <div className="w-full p-8">
      <form
        className="px-5 pt-8 pb-20 mt-7 w-full max-w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-center text-2xl text-primary">Вход</h2>
        <span className="text-center text-neutral mx-auto block mt-1">
          В панель администратора
        </span>
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
      </form>
    </div>
  );
}

export default AdminAuth;
