// import React, {useReducer} from "react"
// import {AlertContext} from "./AlertContext"
// import {SHOW_ALERT} from "../types";
// import {AlertReducer} from "./AlertReducer";
//
// export const AlertState = ({children}) => {
//   const initialState = {
//     alarms: [
//       {id: 1, alarmAt: '9:10'},
//       {id: 2, alarmAt: '9:20'},
//       {id: 3, alarmAt: '9:30'}
//     ]
//   }
//
//   // const [state, dispatch] = useReducer(AlertReducer, initialState)
//
//   const show = (text) => {
//     dispatch({
//       type: SHOW_ALERT,
//       payload: text
//     })
//   }
//
//   const {alarms} = state
//
//   return (
//     <AlertContext.Provider value={{
//       show, alarms
//     }}>
//       {children}
//     </AlertContext.Provider>
//   )
// }