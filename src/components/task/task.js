import { useEffect, useState } from 'react'
import './task.css'
import { formatDistanceToNow } from 'date-fns'

export default function Task({ time, id, description, checked, onDeleted, onToggle, onEditing, date }) {
  const [countdown, setCountdown] = useState(false)
  const [timer, setTimer] = useState(null)
  const [secLeft, setSecleft] = useState(time)
  useEffect(() => {
    if (countdown && !timer) {
      const interval = setInterval(() => setSecleft((sesc) => sesc - 1), 1000)
      setTimer(interval)
    }
    if (!countdown && timer) {
      clearInterval(timer)
      setTimer(null)
    }
  }, [countdown, timer])

  const creationTime = formatDistanceToNow(date, { addSuffix: true })
  return (
    <div className="view">
      <input className="toggle" type="checkbox" id={id} defaultChecked={checked} onClick={onToggle} />
      <label htmlFor={id}>
        <span className={checked ? 'checked' : 'description'}>{description}</span>
        <span className="view-stopwatch">
          {countdown ? (
            <button className="icon-pause" onClick={() => setCountdown(false)} type="button" alt="icon-pause" />
          ) : (
            <button className="icon-play" onClick={() => setCountdown(true)} type="button" alt="icon-play" />
          )}
          <span className="view-time">{`${Math.max((secLeft - (secLeft % 60)) / 60, 0)}:${`0${Math.max(secLeft % 60, 0)}`.slice(-2)}`}</span>
        </span>
        <span className="created">{creationTime}</span>
      </label>
      <button className="icon icon-edit" onClick={onEditing} type="button" alt="log out" />
      <button className="icon icon-destroy" onClick={onDeleted} type="button" alt="log out" />
    </div>
  )
}
