import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { UserIsAuthenticated } from 'utils/router'
import { spinnerWhileLoading } from 'utils/components'

export default compose(
  UserIsAuthenticated,
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  spinnerWhileLoading(['uid']),

  connect(({ firestore: { ordered } }) => {
    if (!ordered.cuenta) return null
    const dates = []
    const bills = []
    ordered.cuenta.map(cuenta => {
      if (
        !dates.length ||
        !dates.filter(fecha => fecha === cuenta.fecha).length
      ) {
        dates.push(cuenta.fecha)
        bills.push({
          fecha: cuenta.fecha,
          total: cuenta.total,
          valorServicio: cuenta.valorServicio
        })
      } else {
        const index = bills.map(bill => bill.fecha).indexOf(cuenta.fecha)
        const savedBill = bills[index]
        bills[index] = {
          fecha: cuenta.fecha,
          total: parseFloat(savedBill.total) + parseFloat(cuenta.total),
          valorServicio:
            parseFloat(savedBill.valorServicio) +
            parseFloat(cuenta.valorServicio)
        }
      }
    })
    return { bills: bills }
  })
)
