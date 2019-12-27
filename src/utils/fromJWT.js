import JWT from 'jwt-decode'

const fromJWT = (token) => token ? JWT(token).data : null

export default fromJWT
