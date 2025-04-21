function Loader({ fullPage = false }) {
  const containerStyle = fullPage
    ? "w-screen h-screen flex items-center justify-center fixed top-0 left-0 z-100 bg-white bg-opacity-75"
    : "";

  return (
    <div className={containerStyle}>
      <div className="w-16 h-16 border-4 border-t-secondary border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
}

export default Loader;
