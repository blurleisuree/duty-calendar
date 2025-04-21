function Text({className, children}) {
  return (
    <p className={`${className} text-lg text-primary`}>
      {children}
    </p>
  )
}

export default Text
