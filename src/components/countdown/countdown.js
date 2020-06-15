import React, { Component } from "react";
import './countdown.css'

class Countdown extends Component {

    destination = Date.now();

    constructor(props) {
        super(props);

        if (this.destination) {
            this.destination = props.destination;
        }

        setInterval(() => {
            this.update()
        }, 1);

        this.state = {
            seconds: 0,
            minutes: 0,
            hours: 0,
            days: 0,
            months: 0
        }
    }

    update() {
        let updatedDate = new Date(this.destination - Date.now());
        this.setState({
            seconds: updatedDate.getUTCSeconds(),
            minutes: updatedDate.getUTCMinutes(),
            hours: updatedDate.getUTCHours(),
            days: updatedDate.getUTCDay(),
            months: updatedDate.getUTCMonth()
        });
    }

    prettyNumber(number) {
        let str = number.toString();
        if (str.length === 1) {
            str = '0' + str;
        }
        let divs = [];
        for (let i = 0; i < str.length; i++) {
            divs.push(
                <div>
                    {str.charAt(i)}
                </div>
            )
        }
        return divs;
    }

    render() {
        return (
            <div className="Countdown">
                {this.prettyNumber(this.state.months)}
                <div className="NoImpact">:</div>
                {this.prettyNumber(this.state.days)}
                <div className="NoImpact">:</div>
                {this.prettyNumber(this.state.hours)}
                <div className="NoImpact">:</div>
                {this.prettyNumber(this.state.minutes)}
                <div className="NoImpact">:</div>
                {this.prettyNumber(this.state.seconds)}
            </div>
        )
    }

}

export default Countdown;
