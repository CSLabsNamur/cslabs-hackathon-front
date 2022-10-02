import React from "react";
import "./timer.css";

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

    this.state = {
      time: new Date(2022, 9, 5, 12, 0, 0),
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
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

export default Timer;
