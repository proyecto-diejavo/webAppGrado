const DateFormat = date => {
  const initialDate = new Date(date)
  const tomorrow = new Date(initialDate.getTime() + 24 * 60 * 60 * 1000)
  const formatedDate = tomorrow.toLocaleDateString()
  return formatedDate
}

export default DateFormat
