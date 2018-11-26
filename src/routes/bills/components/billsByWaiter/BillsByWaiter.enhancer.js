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
    const datesAndWaiters = []
    const billsByWaiter = []
    ordered.cuenta.map(cuenta => {
      if (
        !datesAndWaiters.length ||
        !datesAndWaiters.filter(
          obj => obj.fecha === cuenta.fecha && obj.idMesero === cuenta.idMesero
        ).length
      ) {
        datesAndWaiters.push({ fecha: cuenta.fecha, idMesero: cuenta.idMesero })
        billsByWaiter.push({
          mesero: cuenta.mesero,
          idMesero: cuenta.idMesero,
          fecha: cuenta.fecha,
          total: cuenta.total,
          valorServicio: cuenta.valorServicio
        })
      } else {
        const index = billsByWaiter
          .map(bill => {
            if (bill.idMesero === cuenta.idMesero) return bill.fecha
          })
          .indexOf(cuenta.fecha)
        const savedBill = billsByWaiter[index]
        billsByWaiter[index] = {
          mesero: cuenta.mesero,
          idMesero: cuenta.idMesero,
          fecha: cuenta.fecha,
          total: parseFloat(savedBill.total) + parseFloat(cuenta.total),
          valorServicio:
            parseFloat(savedBill.valorServicio) +
            parseFloat(cuenta.valorServicio)
        }
      }
    })
    return { billsByWaiter: billsByWaiter }
  })
)
