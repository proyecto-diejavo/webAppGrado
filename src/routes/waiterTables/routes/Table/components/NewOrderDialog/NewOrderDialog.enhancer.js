import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { UserIsAuthenticated } from 'utils/router'
import { compose } from 'redux'

export default compose(
  UserIsAuthenticated,
  firestoreConnect(({ params }) => [
    {
      collection: 'jornada',
      orderBy: ['fecha', 'desc']
    }
  ]),
  connect(({ firestore: { ordered } }) => {
    if (!ordered.jornada) return null
    const jornada = ordered.jornada.shift()
    return {
      barras: jornada.barras
    }
  }),
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
