const symbol = '$'
const format = value => (
  symbol + `${value}`.replace(/\D/g, '')
  .replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1.')
  .replace(/\.(?=(\d{3}\.\d{3}\.?)+$)/g, '\'')
)

export default format
