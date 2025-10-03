import React from "react";
import "./timer.css";
import dayjs, { Dayjs } from "dayjs";

function getDateEnv(dateEnv: string) {
  if (dateEnv === undefined) return dayjs();

  return dayjs(dateEnv);
}

function getMessage(diff: { months: number, days: number, hours: number, minutes: number, seconds: number }) {
  const { months, days, hours, minutes, seconds } = diff;

  if (months === 0 && days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    return "👀";
  }

  return `
    ${months ? `${months} mois, ` : ""} 
    ${days ? `${days} jours, ` : ""}
    ${hours ? `${hours} heures, ` : ""}
    ${minutes ? `${minutes} minutes, ` : ""}
    ${seconds ? `${seconds} secondes` : ""}`.trim().replace(/,$/, '');
}

const date = getDateEnv(import.meta.env.VITE_DATE_OPEN);

export class Timer extends React.Component<{}, {
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
    const now = dayjs();
    const diff = dayjs.duration(date.diff(now));

    // If the target date has passed, set everything to zero
    if (date.isBefore(now)) {
      const message = getMessage({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

      this.setState({
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0,
        months: 0,
        message,
      });
      return;
    }

    const months = Math.floor(diff.asMonths());
    const days = Math.floor(diff.asDays()) % 30;
    const hours = diff.hours();
    const minutes = diff.minutes();
    const seconds = diff.seconds();

    const message = getMessage({ months, days, hours, minutes, seconds });

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
      <div id="timer">
        <span>{this.state?.message}</span>
      </div>
    );
  }

}

const timerModule = {Timer, getDateEnv, getMessage};
export default timerModule;
