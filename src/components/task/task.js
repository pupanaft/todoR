import { Component } from 'react'
import './task.css'
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: false,
      secLeft: props.time.seconds + props.time.minute * 60,
    }
    this.changeTimer = () => {
      this.setState(({ timer }) => ({ timer: !timer }))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { timer, secLeft } = this.state
    if (timer) {
      if (secLeft >= 0) this.timeout = setTimeout(() => this.setState((sesc) => ({ secLeft: sesc.secLeft - 1 })), 1000)
    } else if (prevState.timer && this.timeout) clearTimeout(this.timeout)
  }

  render() {
    const { id, description, checked, onDeleted, onToggle, onEditing, date } = this.props
    const { timer, secLeft } = this.state
    const creationTime = formatDistanceToNow(date, { addSuffix: true })
    return (
      <div className="view">
        <input className="toggle" type="checkbox" id={id} checked={checked} onClick={onToggle} />
        <label htmlFor={id}>
          <span className={checked ? 'checked' : 'description'}>{description}</span>
          <span className="view-stopwatch">
            {timer ? (
              <button className="icon-pause" onClick={this.changeTimer} type="button" alt="icon-pause" />
            ) : (
              <button className="icon-play" onClick={this.changeTimer} type="button" alt="icon-play" />
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
}

/// import styles from "./task.css"
/// {styles["view"]
/// { styles[ checked ? "checked" : "description" ] }
/// {`${styles["icon"]} ${styles["icon-edit"]}`}

// this.setState({
//     ...this.state, secLeft:this.state.secLeft-1
// })
