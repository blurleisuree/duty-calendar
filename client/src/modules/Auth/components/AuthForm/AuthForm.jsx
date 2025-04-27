import useAuthStore from "../../store/authStore";
import useAuthWayStore from "../../store/authWayStore";

import useAuthForm from "@shared/hooks/useAuthForm";
import useViewTransition from "@shared/hooks/useViewTransition";

import universalSchema from "../../schemas/authSchema";

import Button from "@shared/components/UI/Button/Button";
import PassInput from "@shared/components/UI/PassInput/PassInput";
import ToggleUser from "../ToggleUser/ToggleUser";
import Error from "../../../../shared/components/UI/Error/Error";

function AuthForm() {
  const { login, loading, error } = useAuthStore();

  const { register, handleSubmit, reset, errors } = useAuthForm({
    formType: "login",
    mode: "onBlur",
    universalSchema: universalSchema,
  });

  const withTransition = useViewTransition();
  const authWayIsAdmin = useAuthWayStore((state) => state.authWayIsAdmin);
  const onSubmit = withTransition(async (data) => {
    try {
      if (authWayIsAdmin) {
        await login(data.password, "admin");
        return;
      }
      await login(data.password);
      reset();
    } catch (e) {
      console.error("Error in AuthForm:", e);
    }
  });

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
      <Button type="submit" className="w-full py-3 mt-4 " disabled={loading}>
        Войти
      </Button>
      <Error className="mt-3">{error}</Error>
      <ToggleUser />
    </form>
  );
}

export default AuthForm;
