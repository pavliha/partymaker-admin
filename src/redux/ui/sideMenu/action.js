export const EXPAND_SIDE_MENU = 'EXPAND_SIDE_MENU'
export const OPEN_MENU_DRAWER = 'OPEN_MENU_DRAWER'
export const CLOSE_MENU_DRAWER = 'CLOSE_MENU_DRAWER'

const expand = (expanded) => ({
  type: EXPAND_SIDE_MENU,
  payload: expanded
})

const openDrawer = () => ({
  type: OPEN_MENU_DRAWER,
})

const closeDrawer = () => ({
  type: CLOSE_MENU_DRAWER,
})

export default {
  expand,
  openDrawer,
  closeDrawer
}
