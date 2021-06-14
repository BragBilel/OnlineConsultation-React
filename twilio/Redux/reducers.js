import { combineReducers } from 'redux'

const ready = (state = false, {type}) => {
    switch (type) {
      case 'SDK_LOADED':
        return true
      case 'TWILIO_CLOSE':
        return false
      default:
        return state
    }
  }

  const reducers = combineReducers({
    ready
  })
  
  export default reducers