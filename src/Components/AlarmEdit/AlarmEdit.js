import React from "react"
import {useParams} from 'react-router'
import {AlarmEditItem} from "../AlarmEditItem/AlarmEditItem"

export const AlarmEdit = ({alarms}) => {
  let { id } = useParams()

  const alarmsRender = () => {
   const alarm = alarms.filter(alarm => {
      return alarm.id === +id
    })
    return alarm
  }

  return (
    <div>
      <AlarmEditItem alarm={alarmsRender()} />
    </div>
  )
}