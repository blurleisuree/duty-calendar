function Error({ children, className }) {
  return <span className={`${className} text-red-600 text-sm block mt-1 font-400`}>{children}</span>;
}

export default Error;
