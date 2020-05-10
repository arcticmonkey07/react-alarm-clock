import React, {useContext, useState} from "react"
import classes from "./Alarms.module.css"
import {Alarm} from "../Alarm/Alarm"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEllipsisV, faPlus} from "@fortawesome/free-solid-svg-icons"
import {AlertContext} from "../../Context/Alert/AlertContext"
import useComponentVisible from "../../CustomHooks/useComponentVisible"
import {Button, Modal} from "react-bootstrap";

export const Alarms = ({alarms}) => {

  console.log(alarms)

  const {dispatch} = useContext(AlertContext)

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')

  const [sunday, setSunday] = useState(false)
  const [monday, setMonday] = useState(false)
  const [tuesday, setTuesday] = useState(false)
  const [wednesday, setWednesday] = useState(false)
  const [thursday, setThursday] = useState(false)
  const [friday, setFriday] = useState(false)
  const [saturday, setSaturday] = useState(false)

  const addAlarm = () => {
    if (hours <= 23 && minutes <= 59) {
      dispatch({
        type: 'ADD_ALARM',
        hours: hours,
        minutes: minutes,
        sunday: sunday,
        monday: monday,
        tuesday: tuesday,
        wednesday: wednesday,
        thursday: thursday,
        friday: friday,
        saturday: saturday
      })
      setHours('')
      setMinutes('')
      handleClose()
    } else {
      alert('Enter true numbers')
    }
  }

  return (
    <div>
      <div className={classes.alarm_top}>
        <h1>Alarms</h1>
        <button
          className={classes.alarm_menu_button}
          onClick={() => setIsComponentVisible(true)}
        >
          <FontAwesomeIcon
            className={classes.alarm_menu_icon}
            icon={faEllipsisV}
          />
        </button>

        { isComponentVisible
            && (
                <ul
                  className={classes.alarm_menu}
                  ref={ref}
                >
                  <li>
                    <button
                      className='btn btn-primary'
                      onClick={() => {
                        dispatch({
                          type: 'ENABLE_ALL_ALARMS'
                        });
                        setIsComponentVisible(false);
                      }}
                    >
                      enable alarms
                    </button>
                  </li>
                  <li>
                    <button
                      className='btn btn-primary'
                      onClick={() => {
                        dispatch({
                          type: 'DISABLE_ALL_ALARMS'
                        });
                        setIsComponentVisible(false);
                      }}
                    >
                      disable alarms
                    </button>
                  </li>
                  <li>
                    <button className='btn btn-primary' onClick={() => setIsComponentVisible(false)}>
                      edit
                    </button>
                  </li>
                </ul>
              )
        }

      </div>
      <ul className={classes.alarms_list}>
        {alarms.map(item => <Alarm key={item.id} {...item} /> )}
      </ul>

      <Button className={classes.Button} onClick={handleShow}>
        <FontAwesomeIcon
          icon={faPlus}
        />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={classes.alarm_time}>
            <p>Time:</p>
            <input
              type="tel"
              value={hours}
              onChange={event => setHours(event.target.value)}
              maxLength='2'
              pattern='[0-12]'
            />
            <span>:</span>
            <input
              type="tel"
              value={minutes}
              onChange={event => setMinutes(event.target.value)}
              maxLength='2'
            />
          </div>
          <div className={classes.alarm_days}>
            <div>
              <input type="checkbox" id='sunday' className={`${classes.alarm_day_checkbox} visually-hidden`} name='sunday' checked={sunday} onChange={() => {setSunday(!sunday)}} />
              <label className={classes.alarm_day_label} htmlFor="sunday">Sun</label>
            </div>
            <div>
              <input type="checkbox" id='monday' className={`${classes.alarm_day_checkbox} visually-hidden`} name='monday' checked={monday} onChange={() => {setMonday(!monday)}} />
              <label className={classes.alarm_day_label} htmlFor="monday">Mon</label>
            </div>
            <div>
              <input type="checkbox" id='tuesday' className={`${classes.alarm_day_checkbox} visually-hidden`} name='tuesday' checked={tuesday} onChange={() => {setTuesday(!tuesday)}} />
              <label className={classes.alarm_day_label} htmlFor="tuesday">Tue</label>
            </div>
            <div>
              <input type="checkbox" id='wednesday' className={`${classes.alarm_day_checkbox} visually-hidden`} name='wednesday' checked={wednesday} onChange={() => {setWednesday(!wednesday)}} />
              <label className={classes.alarm_day_label} htmlFor="wednesday">Wed</label>
            </div>
            <div>
              <input type="checkbox" id='thursday' className={`${classes.alarm_day_checkbox} visually-hidden`} name='thursday' checked={thursday} onChange={() => {setThursday(!thursday)}} />
              <label className={classes.alarm_day_label} htmlFor="thursday">Thu</label>
            </div>
            <div>
              <input type="checkbox" id='friday' className={`${classes.alarm_day_checkbox} visually-hidden`} name='friday' checked={friday} onChange={() => {setFriday(!friday)}} />
              <label className={classes.alarm_day_label} htmlFor="friday">Fri</label>
            </div>
            <div>
              <input type="checkbox" id='saturday' className={`${classes.alarm_day_checkbox} visually-hidden`} name='saturday' checked={saturday} onChange={() => {setSaturday(!saturday)}} />
              <label className={classes.alarm_day_label} htmlFor="saturday">Sat</label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type='submit' variant="primary" onClick={() => {addAlarm()} }>
            Add Alarm
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}