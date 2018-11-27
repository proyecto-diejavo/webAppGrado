const DateFormat = date => {
  const initialDate = new Date(date)
  const formatedDate = initialDate.toLocaleDateString()
  return formatedDate
}

export default DateFormat
