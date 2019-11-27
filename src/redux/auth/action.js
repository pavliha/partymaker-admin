import auth from 'api/auth'
import c from 'src/redux/constants'

const register = form => ({
  type: c.REGISTER_USER,
  payload: auth.register(form),
})

const login = form => ({
  type: c.LOGIN_USER,
  payload: auth.login(form),
})

const logout = () => ({
  type: c.LOGOUT_USER,
  payload: auth.logout(),
})

const set = (user) => ({
  type: c.SET_AUTH_USER,
  payload: user,
})

export default {
  register,
  login,
  set,
  logout,
}
