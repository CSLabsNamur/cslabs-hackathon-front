import React from "react";
import "./timer.css";

function getDateEnv(dateEnv: string | any) {
  if (dateEnv === undefined) return new Date();

  let year = parseInt(dateEnv.substring(0, 4));
  let month = parseInt(dateEnv.substring(5, 7)) - 1;
  let day = parseInt(dateEnv.substring(8, 10));
  let hour = parseInt(dateEnv.substring(11, 13));
  let minute = parseInt(dateEnv.substring(14, 16));
  let second = parseInt(dateEnv.substring(17, 19));

  return new Date(year, month, day, hour, minute, second);
}

function keepLength(idTime: number) {
  if (idTime <= 9)
    return "0" + idTime.toString();
  return idTime.toString();
}

function getMessage(months: any, days: any, hours: any, minutes: any, seconds: any) {
  let message = "";
  if (seconds > 0 || (months + days + hours + minutes) > 0) {
    message = keepLength(seconds) + " secondes";
  }
  if (minutes > 0 || (months + days + hours) > 0) {
    message = keepLength(minutes) + " minutes, " + message;
  }
  if (hours > 0 || (months + days) > 0) {
    message = keepLength(hours) + " heures, " + message;
  }
  if (days > 0 || (months) > 0) {
    message = keepLength(days) + " jours, " + message;
  }
  if (months > 0) {
    message = keepLength(months) + " mois " + message;
  }

  return message;
}

const date = getDateEnv(import.meta.env.VITE_DATE_OPEN);

class Timer extends React.Component<{}, {
  time: Date,
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
  message: string,
  id?: any,
}> {

  constructor(props: any) {
    super(props);

    const now = new Date();

    const timeDifference = date.getTime() - now.getTime();

    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) - (months * 30);
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    const maxMonth = (eventDate: Date, currentDate: Date) => {
      if (eventDate.getFullYear() === currentDate.getFullYear()) {
        return eventDate.getMonth();
      }
      return 12 + eventDate.getMonth();
    };

    for (let month = now.getMonth(); month < maxMonth(date, now); month += 2) {
      days -= 1; // still have impression due to february and leap years
    }

    const message = getMessage(months, days, hours, minutes, seconds);

    this.state = {
      time: date,
      days,
      hours,
      minutes,
      seconds,
      message,
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

    const timeDifference = date.getTime() - now.getTime();

    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) - (months * 30);
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    const maxMonth = (eventDate: Date, currentDate: Date) => {
      if (eventDate.getFullYear() === currentDate.getFullYear()) {
        return eventDate.getMonth();
      }
      return 12 + eventDate.getMonth();
    };

    for (let month = now.getMonth(); month < maxMonth(date, now); month += 2) {
      days -= 1; // still have impression due to february and leap years
    }

    const message = getMessage(months, days, hours, minutes, seconds);

    this.setState({
      ...this.state,
      seconds,
      minutes,
      hours,
      days,
      message,
    });
  }

  render() {
    return (
      <div id="timer">{this.state.message}</div>
    );
  }

}

const timerModule = {Timer, getDateEnv, getMessage};
export default timerModule;
