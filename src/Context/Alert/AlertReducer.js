import {ADD_ALARM, CHANGE_ALARM, DISABLE_ALL_ALARMS, ENABLE_ALL_ALARMS, REMOVE_ALARM, TOGGLE_ALARM} from "../types"

export default function(state, action) {
  switch (action.type) {
    case ADD_ALARM:
      return [
        ...state,
        {
          id: Date.now(),
          alarmAtHour: action.hours,
          alarmAtMinute: action.minutes,
          days: {sunday: action.sunday, monday: action.monday, tuesday: action.tuesday, wednesday: action.wednesday, thursday: action.thursday, friday: action.friday, saturday: action.saturday},
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
    case CHANGE_ALARM:
      const item = state.find(alarm => {
        return alarm.id === +action.payload
      })
      item.alarmAtHour = action.hours
      item.alarmAtMinute = action.minutes
      item.days.sunday = action.sunday
      item.days.monday = action.monday
      item.days.tuesday = action.tuesday
      item.days.wednesday = action.wednesday
      item.days.thursday = action.thursday
      item.days.friday = action.friday
      item.days.saturday = action.saturday
      localStorage.setItem('alarms', JSON.stringify(state))
      return state
    default:
      return state
  }
}