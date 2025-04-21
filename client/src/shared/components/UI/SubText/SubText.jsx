function SubText({className, children}) {
  return (
    <p className={`${className} text-neutral`}>
      {children}
    </p>
  )
}

export default SubText
