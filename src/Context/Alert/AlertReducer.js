import {ADD_ALARM, DISABLE_ALL_ALARMS, ENABLE_ALL_ALARMS, REMOVE_ALARM, TOGGLE_ALARM} from "../types"
//
// const handlers = {
//   // [ADD_ALARM]: (state, action) => ({...state, alarmAt: action.payload}),
//   [SHOW_ALERT]: (state, action) => ({...state, alarms: [...state.alarms, {alarmAt: action.payload}]}),
//   DEFAULT: state => state
// }
//
// export const AlertReducer = (state, action) => {
//   const handler = handlers[action.type] || handlers.DEFAULT
//   return handler(state, action)
// }

export default function(state, action) {
  switch (action.type) {
    case ADD_ALARM:
      return [
        ...state,
        {
          id: Date.now(),
          alarmAt: action.payload,
          willWork: false
        }
      ]
    case TOGGLE_ALARM:
      return state.map(alarm => {
          if (alarm.id === action.payload) {
            alarm.willWork = !alarm.willWork
          }
          return alarm
        })
    case REMOVE_ALARM:
      return state.filter(alarm => {
          return alarm.id !== action.payload
        })
    case DISABLE_ALL_ALARMS:
      return state.map(alarm => {
        alarm.willWork = false
        return alarm
      })
    case ENABLE_ALL_ALARMS:
      return state.map(alarm => {
        alarm.willWork = true
        return alarm
      })
    default:
      return state
  }
}