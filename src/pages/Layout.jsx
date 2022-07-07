import React, { Component } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { updateApp } from "../store";

export const Layout = (props) => {
    return (<LayoutComponent dispatch={useDispatch()} location={useLocation()} />)
}

export class LayoutComponent extends Component {
    render() {
        if (this.props.location.state && this.props.location.state.shouldUpdate === true) {
            this.props.history.replace("/", { shouldUpdate: false });
            this.props.dispatch(updateApp({ shouldUpdate: true }));
        } else
            return (
                <>
                    <Navbar />
                    <Outlet />
                </>
            );
    }
}
