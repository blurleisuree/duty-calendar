import Logo from "../../../../shared/components/UI/Logo/Logo";
import AuthForm from "../AuthForm/AuthForm";
import AuthFooter from "../AuthFooter/AuthFooter";

function Auth() {
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <div className="flex flex-col items-center justify-center w-full h-full px-10">
        <Logo type="full" className="mx-auto" />
        <AuthForm />
      </div>
      <AuthFooter />
    </div>
  );
}

export default Auth;
