import React, {useContext, useState} from "react"
import {useHistory} from "react-router"
import classes from './AlarmEditItem.module.css'
import classesAlarm from '../Alarms/Alarms.module.css'
import {AlertContext} from "../../Context/Alert/AlertContext"

export const AlarmEditItem = ({alarm}) => {

  const {dispatch} = useContext(AlertContext)
  const [hours, setHours] = useState(alarm.alarmAtHour)
  const [minutes, setMinutes] = useState(alarm.alarmAtMinute)
  let history = useHistory()

  const [sunday, setSunday] = useState(alarm.days.sunday)
  const [monday, setMonday] = useState(alarm.days.monday)
  const [tuesday, setTuesday] = useState(alarm.days.tuesday)
  const [wednesday, setWednesday] = useState(alarm.days.wednesday)
  const [thursday, setThursday] = useState(alarm.days.thursday)
  const [friday, setFriday] = useState(alarm.days.friday)
  const [saturday, setSaturday] = useState(alarm.days.saturday)

  return (
    <div>
      <button
        className={classes.back_button}
        onClick={() => history.goBack()}
      >Back</button>

      <div className={classes.time_wrapper}>
        <p>Time:</p>
        <input
          type="tel"
          value={hours}
          onChange={(event) => setHours(event.target.value)}
          maxLength='2'
        />
        <span>:</span>
        <input
          type="tel"
          value={minutes}
          onChange={(event) => setMinutes(event.target.value)}
          maxLength='2'
        />
      </div>
      <div className={`${classesAlarm.alarm_days} ${classes.alarm_days}`}>
        <div>
          <input type="checkbox" id='sunday' className={`${classesAlarm.alarm_day_checkbox} visually-hidden`} name='sunday' checked={sunday} onChange={() => {setSunday(!sunday)}} />
          <label className={classesAlarm.alarm_day_label} htmlFor="sunday">Sun</label>
        </div>
        <div>
          <input type="checkbox" id='monday' className={`${classesAlarm.alarm_day_checkbox} visually-hidden`} name='monday' checked={monday} onChange={() => {setMonday(!monday)}} />
          <label className={classesAlarm.alarm_day_label} htmlFor="monday">Mon</label>
        </div>
        <div>
          <input type="checkbox" id='tuesday' className={`${classesAlarm.alarm_day_checkbox} visually-hidden`} name='tuesday' checked={tuesday} onChange={() => {setTuesday(!tuesday)}} />
          <label className={classesAlarm.alarm_day_label} htmlFor="tuesday">Tue</label>
        </div>
        <div>
          <input type="checkbox" id='wednesday' className={`${classesAlarm.alarm_day_checkbox} visually-hidden`} name='wednesday' checked={wednesday} onChange={() => {setWednesday(!wednesday)}} />
          <label className={classesAlarm.alarm_day_label} htmlFor="wednesday">Wed</label>
        </div>
        <div>
          <input type="checkbox" id='thursday' className={`${classesAlarm.alarm_day_checkbox} visually-hidden`} name='thursday' checked={thursday} onChange={() => {setThursday(!thursday)}} />
          <label className={classesAlarm.alarm_day_label} htmlFor="thursday">Thu</label>
        </div>
        <div>
          <input type="checkbox" id='friday' className={`${classesAlarm.alarm_day_checkbox} visually-hidden`} name='friday' checked={friday} onChange={() => {setFriday(!friday)}} />
          <label className={classesAlarm.alarm_day_label} htmlFor="friday">Fri</label>
        </div>
        <div>
          <input type="checkbox" id='saturday' className={`${classesAlarm.alarm_day_checkbox} visually-hidden`} name='saturday' checked={saturday} onChange={() => {setSaturday(!saturday)}} />
          <label className={classesAlarm.alarm_day_label} htmlFor="saturday">Sat</label>
        </div>
      </div>

      <button
        onClick={() => {
          dispatch({
            type: 'CHANGE_ALARM',
            payload: alarm.id,
            hours: hours,
            minutes: minutes,
            sunday: sunday,
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday,
            willWork: false
          })
        }}
      >Save</button>
    </div>
  )
}