import React, {useContext, useState} from "react"
import classes from './Alarm.module.css'
import {AlertContext} from "../../Context/Alert/AlertContext"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEllipsisV, faTrashAlt} from "@fortawesome/free-solid-svg-icons"
import useComponentVisible from "../../CustomHooks/useComponentVisible"
import {NavLink} from "react-router-dom";

export const Alarm = ({alarmAtHour, alarmAtMinute, days, id, willWork}) => {

  const {dispatch} = useContext(AlertContext)

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

  const [fall, setFall] = useState(false)

  const fallHandler = () => {
    setFall(true)

    setTimeout(() => {
      dispatch({
       type: 'REMOVE_ALARM',
       payload: id
     })
    }, 600)
  }

  const daysArrTransform = () => {
    let arrDays = []
    Object.entries(days).map(([key, value]) => {
      if (value) {
        arrDays.push(key)
      }
    })
    return arrDays
  }

  // var date = new Date();
  // console.log(typeof String(date.getMinutes()));

  return (
      <li className={`
        ${classes.alarm_item}
        ${fall ? classes.fall : ''}
      `}>
        <div className={classes.alarm_top}>
          <button
            className={classes.alarm_menu_button}
            onClick={() => {setIsComponentVisible(true)}}
          >
            <FontAwesomeIcon
              className={classes.alarm_menu_icon}
              icon={faEllipsisV}
            />
          </button>
          {isComponentVisible
            && (
              <ul
                className={classes.alarm_menu}
                ref={ref}
              >
                <li>
                  <NavLink
                    className='btn btn-primary'
                    to={'/alarm-edit/' + id}
                    onClick={() => setIsComponentVisible(false)}
                  >edit
                  </NavLink>
                </li>
              </ul>
            )
          }
        </div>
        <div className={classes.alarm_middle}>
          <span className={classes.alarm_label}>
            {alarmAtHour}:{alarmAtMinute}
            <FontAwesomeIcon
              className={classes.delete_icon}
              icon={faTrashAlt}
              color='#007bff'
              onClick={fallHandler}
            />
          </span>
          <div className={classes.alarm_switch + ' custom-control custom-switch'}>
            <input
              type="checkbox"
              className="custom-control-input"
              id={id}
              checked={willWork}
              onChange={() => dispatch({
                type: 'TOGGLE_ALARM',
                payload: id
              })
              }
            />
            <label className="custom-control-label" htmlFor={id}></label>
          </div>
        </div>
        <div className={classes.alarm_bottom}>
          <ul className={classes.alarm_list}>
            {daysArrTransform().map(alarm => (
                <li key={alarm}>{alarm}</li>
              )
            )}
          </ul>
        </div>
      </li>
  )
}