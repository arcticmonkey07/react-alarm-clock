import React, {useReducer, useEffect} from "react"
import classes from './Wrapper.module.css'
import {Alarms} from "../Alarms/Alarms"
import {AlertContext} from "../../Context/Alert/AlertContext"
import AlertReducer from "../../Context/Alert/AlertReducer"
import {Route, Switch} from "react-router-dom"
import {AlarmEdit} from "../AlarmEdit/AlarmEdit"

export const Wrapper = () => {
  const [state, dispatch] = useReducer(AlertReducer, JSON.parse(localStorage.getItem('alarms')))

  useEffect(() => {
    localStorage.setItem('alarms', JSON.stringify(state))
  }, [state])

  return (
    <AlertContext.Provider value={{
      dispatch
    }}>
      <div className={classes.Wrapper}>
        <Switch>
          <Route path='/' exact component={() => <Alarms alarms={state} />} />
          <Route path='/alarm-edit/:id' component={() => <AlarmEdit alarms={state} />}/>
        </Switch>
      </div>
    </AlertContext.Provider>
  )
}