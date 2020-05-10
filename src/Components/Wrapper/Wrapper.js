import React, {useReducer, useEffect} from "react"
import classes from './Wrapper.module.css'
import {Alarms} from "../Alarms/Alarms"
import {AlertContext} from "../../Context/Alert/AlertContext"
import AlertReducer from "../../Context/Alert/AlertReducer"
import {HashRouter, Route, Switch} from "react-router-dom"
import {AlarmEdit} from "../AlarmEdit/AlarmEdit"

export const Wrapper = () => {
  const initialState = [
    {
      id: 1,
      alarmAtHour: '9',
      alarmAtMinute: '10',
      days: {sunday: true, monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true},
      willWork: false
    },
    {
      id: 2,
      alarmAtHour: '9',
      alarmAtMinute: '20',
      days: {sunday: true, monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false},
      willWork: true},
    {
      id: 3,
      alarmAtHour: '9',
      alarmAtMinute: '30',
      days: {sunday: true, monday: true, tuesday: false, wednesday: false, thursday: false, friday: true, saturday: false},
      willWork: false}
  ]

  const [state, dispatch] = useReducer(AlertReducer, JSON.parse(localStorage.getItem('alarms')) || initialState)

  useEffect(() => {
    localStorage.setItem('alarms', JSON.stringify(state))
  }, [state])

  return (
    <AlertContext.Provider value={{
      dispatch
    }}>
      <div className={classes.Wrapper}>
        <HashRouter>
          <Switch>
            <Route path='/' exact>
              <Alarms alarms={state} />
            </Route>
            <Route path='/alarm-edit/:id'>
              <AlarmEdit alarms={state} />
            </Route>
          </Switch>
        </HashRouter>
      </div>
    </AlertContext.Provider>
  )
}