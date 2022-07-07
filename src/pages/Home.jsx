import React, { Component } from "react";
import { useDispatch } from "react-redux";
import { Outlet, Link, useLocation } from "react-router-dom";
import { updateApp } from "../store";

import '../styles/home.css'

export const Home = (props) => {
    return <HomeComponent {...props} dispatch={useDispatch()} location={useLocation()} />
}

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginButtonHidden: false
        }
        this.hideLoginButtonState = this.hideLoginButtonState.bind(this);
    }

    hideLoginButtonState(state) {
        this.setState({ loginButtonHidden: state });
    }

    render() {
        const { pathname } = this.props.location;

        if (this.props.location.state && this.props.location.state.shouldUpdate) {
            this.props.history.replace("/", { shouldUpdate: false });
            this.props.dispatch(updateApp({ shouldUpdate: true }));
        } else
            return (
                <>
                    <main className="content-page home-container center screen-fill flex-row">
                        <section className="home-content center flex-column">
                            <div className="welcome-content">Welcome !</div>
                            <section className="title">
                                <div className="title-content">Surge</div>
                            </section>
                            <Link className={"btn login-btn default-btn rounded " + (pathname === "/login" ? "hide" : "")} to={"./login"} replace={true}>
                                Login
                            </Link>
                        </section>

                        <Outlet />
                    </main>
                </>
            );
    }
}
