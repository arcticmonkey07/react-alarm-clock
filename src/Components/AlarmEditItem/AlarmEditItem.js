import React from "react"
import {useHistory} from "react-router"

export const AlarmEditItem = ({alarm}) => {
  let history = useHistory()

  const item = alarm[0]

  console.log(item)

  return (
    <div>
      <button onClick={() => history.goBack()}>Back</button>
      <h1>Time: {item.alarmAt}</h1>
    </div>
  )
}