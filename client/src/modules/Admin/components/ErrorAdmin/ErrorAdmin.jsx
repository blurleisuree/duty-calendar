import error from "../../../../assets/icons/error.svg";

function ErrorAdmin() {
  return (
    <div className="mt-10 w-full flex-col justify-center items-center">
      <img src={error} alt="error" className="mx-auto" />
      <h3 className="text-center mt-4 text-primary text-lg max-w-82 text-center mx-auto">
        Необходимо войти как администратор
      </h3>
    </div>
  );
}

export default ErrorAdmin;
