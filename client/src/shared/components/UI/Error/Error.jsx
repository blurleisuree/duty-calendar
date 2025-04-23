function Error({ children, className }) {
  return <span className={`${className} text-red text-sm block mt-1 font-400`}>{children}</span>;
}

export default Error;
