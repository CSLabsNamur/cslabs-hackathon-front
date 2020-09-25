import React, { Component } from "react";
import './countdown.css'

class Countdown extends Component {

    destination = new Date(2020, 10, 23);

    constructor(props) {
        super(props);

        if (props.destination) {
            this.destination = props.destination;
        }

        this.state = {
            seconds: 0,
            minutes: 0,
            hours: 0,
            days: 0,
            months: 0
        }

        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;

        setInterval(() => {
            if (this._isMounted) {
                this.update();
            }
        }, 1);
    }

    componentWillUnmount() {
        this._isMounted = false;
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
                <div key={i}>
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
                <div className="NoImpact">m</div>
                {this.prettyNumber(this.state.days)}
                <div className="NoImpact">j</div>
                {this.prettyNumber(this.state.hours)}
                <div className="NoImpact">h</div>
                {this.prettyNumber(this.state.minutes)}
                <div className="NoImpact">m</div>
                {this.prettyNumber(this.state.seconds)}
                <div className="NoImpact">s</div>
            </div>
        )
    }

}

export default Countdown;
