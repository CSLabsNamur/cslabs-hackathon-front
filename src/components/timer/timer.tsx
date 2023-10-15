import React from "react";
import "./timer.css";

function getDateEnv() {
  const dateEnv = process.env.REACT_APP_DATE; // default: YYYY-MM-DD-hh-mm-ss

  if (dateEnv === undefined) return new Date();

  let year = parseInt(dateEnv.substring(0, 4));
  let month = parseInt(dateEnv.substring(5, 7)) - 1;
  let day = parseInt(dateEnv.substring(8, 10));
  let hour = parseInt(dateEnv.substring(11, 13));
  let minute = parseInt(dateEnv.substring(14, 16));
  let second = parseInt(dateEnv.substring(17, 19));

  return new Date(year, month, day, hour, minute, second);
}

const date = getDateEnv();

class Timer extends React.Component<{}, {
  time: Date,
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
  id?: any,
}> {

  constructor(props: any) {
    super(props);

    const now = new Date();

    const ms = date.getTime() - now.getTime();
    const seconds = Math.ceil(ms/1000) % 60;
    const minutes = Math.ceil(ms/(60*1000)) % 60;
    const hours = Math.ceil(ms/(60*60*1000)) % 24;
    const days = Math.ceil(ms/(24*60*60*1000));

    this.state = {
      time: date,
      days,
      hours,
      minutes,
      seconds,
    };

    this.updateTimer = this.updateTimer.bind(this);
  }

  componentDidMount() {
    const id = setInterval(this.updateTimer, 1000);
    this.setState({
      ...this.state,
      id,
    });
  }

  componentWillUnmount() {
    if (!!this.state.id) {
      clearInterval(this.state.id);
    }
  }

  updateTimer() {
    const now = new Date();

    const ms = this.state.time.getTime() - now.getTime();
    const seconds = Math.ceil(ms/1000) % 60;
    const minutes = Math.ceil(ms/(60*1000)) % 60;
    const hours = Math.ceil(ms/(60*60*1000)) % 24;
    const days = Math.ceil(ms/(24*60*60*1000));


    this.setState({
      ...this.state,
      seconds,
      minutes,
      hours,
      days,
    });
  }

  render() {
    const {days, hours, minutes, seconds} = this.state;

    let message = seconds.toString() + ' secondes';

    if (minutes > 0) {
      message = minutes.toString() + ' minutes et ' + message;
    }
    if (hours > 0) {
      message = hours.toString() + ' heures, ' + message;
    }
    if (days > 0) {
      message = days.toString() + ' jours, ' + message;
    }

    return (
      <div id="timer">{message}</div>
    );
  }

}
const timerModule = {Timer, getDateEnv}
export default timerModule;