function DayOfWeek({children, className}) {
  return (
    <div className={`${className} p-2 text-primary font-medium`}>
      {children}
    </div>
  )
}

export default DayOfWeek
