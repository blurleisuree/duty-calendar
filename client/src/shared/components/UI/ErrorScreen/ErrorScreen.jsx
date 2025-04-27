import error from "@assets/icons/error.svg";

function ErrorScreen({ className, children }) {
  return (
    <div className={`${className} mx-auto mt-20`}>
      <img src={error} alt="error" className="mx-auto" />
      <h3 className="text-center mt-4 text-primary text-lg">{children}</h3>
    </div>
  );
}

export default ErrorScreen;
