import React, {useContext, useState} from "react"
import classes from "./Alarms.module.css"
import {Alarm} from "../Alarm/Alarm"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEllipsisV, faPlus} from "@fortawesome/free-solid-svg-icons"
import {AlertContext} from "../../Context/Alert/AlertContext"
import useComponentVisible from "../../CustomHooks/useComponentVisible"
import {Button, Modal} from "react-bootstrap";

export const Alarms = ({alarms}) => {

  const {dispatch} = useContext(AlertContext)

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const time = hours + ':' + minutes

  const addAlarm = () => {
    dispatch({
      type: 'ADD_ALARM',
      payload: time
    })
    setHours('')
    setMinutes('')
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
          <input
            type="tel"
            value={hours}
            onChange={event => setHours(event.target.value)}
            maxLength='2'
          />
          <span>:</span>
          <input
            type="tel"
            value={minutes}
            onChange={event => setMinutes(event.target.value)}
            maxLength='2'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {addAlarm(); handleClose();} }>
            Add Alarm
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}