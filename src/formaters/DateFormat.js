import capitalize from 'js-capitalize'

const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
}

const DateFormat = date =>
  date
    .toLocaleDateString('es', options)
    .split(' ')
    .join('/')
    .replace(/\./g, '')

const format = val => capitalize.words(`${DateFormat(val)}`)

export default format
