import isPromise from 'is-promise'
import normalize from 'normalize-api'

const normalizeMiddleware = () => next => async action => {
  if (action.meta && action.meta.normalize && !isPromise(action.payload)) {
    const data = action.payload.data || action.payload

    const normalizedAction = {
      ...action,
      payload: normalize(data, action.meta.normalize)
    }

    next(normalizedAction)
    return normalizedAction
  }

  next(action)
}

export default normalizeMiddleware
