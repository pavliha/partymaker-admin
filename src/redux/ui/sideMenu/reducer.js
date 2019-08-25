import { CLOSE_MENU_DRAWER, EXPAND_SIDE_MENU, OPEN_MENU_DRAWER } from './action'

const items = []

const initialState = {
  expanded: items,
  isDrawerOpen: false,
}

const sideMenuReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case EXPAND_SIDE_MENU:
      return {
        ...state,
        expanded: payload,
      }

    case OPEN_MENU_DRAWER:
      return {
        ...state,
        isDrawerOpen: true,
      }

    case CLOSE_MENU_DRAWER:
      return {
        ...state,
        isDrawerOpen: false,
      }

    default:
      return state
  }
}

export default sideMenuReducer
