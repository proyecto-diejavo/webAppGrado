import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'
import { DateFormat } from 'formaters'
import { compose } from 'redux'

const today = DateFormat(new Date())
export default compose(
  UserIsAuthenticated,
  firestoreConnect(({ params }) => [
    {
      collection: 'jornada',
      where: ['fecha', '==', today]
    }
  ]),
  connect(({ firestore: { ordered } }) => {
    if (!ordered.jornada || !ordered.jornada.length) return null
    return {
      barras: ordered.jornada[0].barras
    }
  }),
  spinnerWhileLoading(['barras']),

  firestoreConnect(({ params }) => [
    {
      collection: 'productos',
      where: ['activo', '==', true]
    }
  ]),
  connect(({ firestore: { ordered } }) => {
    if (!ordered.productos) return null
    return {
      productos: ordered.productos,
      productosBarra: ordered.productos.filter(
        producto => producto.origen === 'barra'
      ),
      productosCocina: ordered.productos.filter(
        producto => producto.origen === 'cocina'
      )
    }
  }),
  reduxForm({
    form: 'newOrder',
    onSubmitSuccess: (result, dispatch, props) => props.reset()
  })
)
