
import React, { Component } from "react";
import { Redirect } from "react-router";
import Cookies from "js-cookie";
import { UserContext } from "../../context/user";

export class Disconnection extends Component {

    static contextType = UserContext;

    componentDidMount() {
        this.context.disconnect();
        Cookies.remove("id");
    }

    render() {
        return (<Redirect to="/" />);
    }

}
