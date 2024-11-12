import React from "react";
import "./timer.css";
import { DateTime, Duration } from "luxon";

function getDateEnv(dateEnv: string) {
  if (dateEnv === undefined) return DateTime.now();

  return DateTime.fromISO(dateEnv);
}

function getMessage(date: Duration) {
  return date.toFormat(`
    ${date.months ? "M 'mois', " : ""} 
    ${date.days ? "d 'jours', " : ""}
    ${date.hours ? "h 'heures', " : ""}
    ${date.minutes ? "m 'minutes', " : ""}
    ${date.seconds ? "s 'secondes'" : "👀"}`,
  );
}

const date = getDateEnv(import.meta.env.VITE_DATE_OPEN);

class Timer extends React.Component<{}, {
  time: Date,
  months: number,
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
  message: string,
  id?: any,
}> {

  constructor(props: any) {
    super(props);
    this.updateTimer = this.updateTimer.bind(this);
  }

  componentDidMount() {
    this.updateTimer();
    const id = setInterval(this.updateTimer, 1000);
    this.setState({
      id,
    });
  }

  componentWillUnmount() {
    if (!!this.state?.id) {
      clearInterval(this.state?.id);
    }
  }

  updateTimer() {
    const diff = date.diffNow(["months", "days", "hours", "minutes", "seconds"]);
    const {months, days, hours, minutes, seconds} = diff;

    const message = getMessage(diff);

    this.setState({
      seconds,
      minutes,
      hours,
      days,
      months,
      message,
    });
  }

  render() {
    return (
      <div id="timer">{this.state?.message}</div>
    );
  }

}

const timerModule = {Timer, getDateEnv, getMessage};
export default timerModule;
