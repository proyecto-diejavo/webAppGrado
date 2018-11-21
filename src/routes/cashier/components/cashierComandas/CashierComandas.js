import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import { OrderCard } from 'components'

const resolveState = 'Cancelada'
export const cashierComandas = ({ children, cuenta, auth, putComanda }) =>
  children ? (
    cloneElement(children, { auth })
  ) : (
    <div>
      {!isEmpty(cuenta) &&
        cuenta.map((cuentas, index) => (
          <OrderCard
            key={`cashierComandas-${index}`}
            order={cuentas}
            title={`Mesa ${cuentas.numeroMesa}`}
            onClick={() => putComanda(cuentas.id, resolveState)}
            textModal={'¿Desea confirmar la cancelación del servicio?'}
          />
        ))}
    </div>
  )

cashierComandas.propTypes = {
  children: PropTypes.object,
  auth: PropTypes.object,
  cuenta: PropTypes.object,
  putComanda: PropTypes.func
}

export default cashierComandas
