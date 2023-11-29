import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    running: false,
    timeThing: 25,
    timeSettingVariable: 25,
    resetThing: true,
    secondsThing: '00',
  }

  componentDidMount() {
    this.timerThing = setInterval(this.updateTimer, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerThing)
  }

  updateTimer = () => {
    const {running, timeThing} = this.state

    if (running && timeThing >= 0) {
      this.setState(prevState => {
        let newSeconds = parseInt(prevState.secondsThing)
        let newMinutes = prevState.timeThing

        if (newSeconds > 0) {
          newSeconds -= 1
        } else if (newSeconds === 0 && newMinutes > 0) {
          newSeconds = 59
          newMinutes -= 1
        } else {
          newSeconds = 0
          newMinutes = 0
        }

        return {
          timeThing: newMinutes,
          secondsThing: newSeconds < 10 ? `0${newSeconds}` : `${newSeconds}`,
        }
      })
    }
  }

  startClock = () => {
    this.setState(prevState => ({
      running: !prevState.running,
      resetThing: false,
    }))
  }

  incTime = () => {
    const {resetThing} = this.state
    if (resetThing) {
      this.setState(prevState => ({
        timeThing: prevState.timeThing + 1,
        timeSettingVariable: prevState.timeSettingVariable + 1,
      }))
    }
  }

  decTime = () => {
    const {resetThing} = this.state
    if (resetThing) {
      this.setState(prevState => ({
        timeThing: prevState.timeThing - 1,
        timeSettingVariable: prevState.timeSettingVariable - 1,
      }))
    }
  }

  resetTime = () => {
    this.setState({
      resetThing: true,
      timeThing: 25,
      running: false,
      secondsThing: '00',
      timeSettingVariable: 25,
    })
  }

  render() {
    const {running, timeThing, secondsThing, timeSettingVariable} = this.state

    return (
      <div className="total-thing">
        <h1 className="headThing">Digital Timer</h1>
        <div className="flexDiv">
          <div className="bgDiv">
            <div className="roundDiv">
              <h1 className="timeHead">{`${timeThing}:${secondsThing}`}</h1>
              <p className="firstPara">{running ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="controlDiv">
            <div className="startResetDiv">
              <button
                onClick={this.startClock}
                className="startBtn startResetStyle startResetDiv"
                type="button"
              >
                {running ? (
                  <img
                    alt="pause icon"
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                  />
                ) : (
                  <img
                    alt="play icon"
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                  />
                )}
                {running ? 'Pause' : 'Start'}
              </button>

              <button
                onClick={this.resetTime}
                className="startResetStyle startResetDiv"
                type="button"
              >
                <img
                  alt="reset icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                />
                Reset
              </button>
            </div>
            <div className="setLimitDiv">
              <p className="timLimPara">Set Timer Limit</p>
              <div className="plusMinusDiv">
                <button
                  onClick={this.decTime}
                  className="plusMinBtn minBtn"
                  type="button"
                >
                  -
                </button>
                <p className="finalPara">{timeSettingVariable}</p>
                <button
                  onClick={this.incTime}
                  className="plusMinBtn plusBtn"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
