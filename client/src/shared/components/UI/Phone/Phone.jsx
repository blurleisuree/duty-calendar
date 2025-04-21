function Phone({className, children}) {
  return (
    <p className={`${className} text-active underline cursor-pointer text-lg `}>
    {children}
    </p>
  )
}

export default Phone
