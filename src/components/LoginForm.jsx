import React, { Component, createRef } from "react";
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { Person, Eye, EyeSlash, Key } from "./Images";

import { authenticate } from '../api/request'

import { Message } from "./Message";
import Indicator from "./Indicator";

export const LoginForm = () => {
    return <LoginFormComponent location={useLocation()} dispatch={useDispatch()} info={useSelector(state => state)} />
}

export class LoginFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            isWaiting: false,
            output: undefined,
            redirect: undefined
        }
        this.LoginForm = createRef();
    }

    changePasswordState() {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    login() {
        this.setState({ isWaiting: true, output: undefined });

        authenticate(this.LoginForm.current)
            .catch(e => {
                this.setState({ output: "Something went wrong.", isWaiting: false })
            })
            .then(res => res.json())
            .then(res => {
                if (!res) {
                    this.setState({ output: "Unknown Error.", isWaiting: false })
                }

                if (res.status !== 200) {
                    this.setState({ output: res.query, isWaiting: false })
                } else {
                    this.setState({ redirect: "/", isWaiting: false });
                }
            })
    }

    render() {
        const { showPassword, isWaiting, output, redirect } = this.state;

        if (redirect) {
            return (<Navigate to={redirect} replace={true} state={{ shouldUpdate: true }} />)
        }

        return (
            <>
                <form ref={this.LoginForm} className="data-form login-form center flex-column" onSubmit={(e) => {
                    e.preventDefault();
                    this.login();
                }}>
                    <div className="form-title">Login</div>
                    <div className={"data-input center flex-row " + (isWaiting ? "disabled" : "")}>
                        <div className="input-logo center medium">
                            {Person}
                        </div>
                        <input className="data-field" type="email" name="email" id="email" disabled={isWaiting} spellCheck="false" title="Please enter a valid email address." autoComplete="off" placeholder="Email" style={{ paddingRight: '15px' }} />
                    </div>
                    <div className={"data-input center flex-row " + (isWaiting ? "disabled" : "")}>
                        <div className="input-logo center medium">
                            {Key}
                        </div>
                        <input type={showPassword ? "text" : "password"} className="data-field" disabled={isWaiting} spellCheck="false" name="password" id="password" title="Required field cannot be empty." autoComplete="off" placeholder="Password" />
                        <div className="input-logo small center btn" onClick={() => {
                            this.changePasswordState();
                        }}>
                            {showPassword ? EyeSlash : Eye}
                        </div>
                    </div>
                    {
                        isWaiting ? <Indicator /> : ""
                    }
                    {
                        output && (
                            <Message type="error" output={output} />
                        )
                    }
                    <button className="btn default-btn rounded" disabled={isWaiting} style={{ width: '100%' }}  >
                        Login
                    </button>
                </form>
            </>
        );
    }
}

