/* eslint-disable no-param-reassign */
export default array => (array || []).reduce((obj, item) => {
  if (!item.id) throw new Error('id not found inside object')
  obj[item.id] = item

  return obj
}, {})
