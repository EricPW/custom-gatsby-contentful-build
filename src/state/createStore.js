import { createStore as reduxCreateStore } from 'redux'

const reducer = (state, action) => {
  switch (action.type){
    case `TOGGLENAV`:
      return Object.assign({}, state, {
        showNav: !state.showNav,
      })
    case `INVERTHEADER`:
      return Object.assign({}, state, {
        invertedHeader: true,
      })
    case `REVERTHEADER`:
      return Object.assign({}, state, {
        invertedHeader: false,
      })
    default:
      break
  }
  return state
}

const initialState = {
  showNav: false,
  invertedHeader: false,
}

const createStore = () => reduxCreateStore(reducer, initialState)

export default createStore
