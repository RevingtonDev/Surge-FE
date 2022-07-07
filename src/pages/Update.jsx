import React, { Component, createRef } from "react";
import { useDispatch } from 'react-redux'
import { update_profile } from "../api/request";
import { Eye, EyeSlash } from "../components/Images";
import { Message } from "../components/Message";
import { updateApp } from "../store";

import '../styles/update.css'

export const Update = () => {
    return <UpdateComponent dispatch={useDispatch()} />
}

export class UpdateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWaiting: false,
            output: null,
            passwordShowing: false,
            shouldUpdate: false
        }
        this.form = createRef();
    }


    setPasswordShowing(state) {
        this.setState({ passwordShowing: state });
    }

    updateForm() {
        this.setState({
            isWaiting: true, output: null
        });

        if (this.form.current.password.value !== this.form.current.confirm.value) {
            this.setState({
                output: "Password and Confirm Password fields do not match.",
                isWaiting: false
            });
            return;
        }

        update_profile(this.form.current)
            .catch(e => {
                this.setState({
                    output: "Something went wrong.",
                    isWaiting: false
                })
            })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    this.setState({ shouldUpdate: true })
                } else {
                    this.setState({
                        output: res.query,
                        isWaiting: false
                    });
                }
            });
    }

    render() {
        const { shouldUpdate, isWaiting, passwordShowing, output } = this.state,
            days = [], years = [];

        for (let i = 1; i <= 31; i++) {
            days.push(<option value={i} key={i}>{i}</option>)
        }
        let year = new Date().getFullYear();
        for (let i = year - 100; i <= year; i++) {
            years.push(<option value={i} key={i}>{i}</option>)
        }

        if (shouldUpdate) {
            this.props.dispatch(updateApp({ shouldUpdate: true }));
        }
        return (
            <>
                <main className="content-page update-page screen-fill center flex-column">
                    <div className="title">
                        <div className="title-content">Surge</div>
                    </div>
                    <Message type="error" output="Please fill out the details in order to move further." />
                    <form ref={this.form} className="data-form update-form" onSubmit={(e) => {
                        e.preventDefault();
                    }}>
                        <div className="data-input">
                            First Name
                            <input required autoComplete="off" type="text" disabled={isWaiting} name="firstName" className="data-field" placeholder="First Name" />
                        </div>
                        <div className="data-input">
                            Last Name
                            <input required autoComplete="off" type="text" disabled={isWaiting} name="lastName" className="data-field" placeholder="Last Name" />
                        </div>
                        <div className="data-input">
                            Mobile Number
                            <div className="data-input-field center flex-row">
                                +94
                                <input required autoComplete="off" type="number" disabled={isWaiting} name="mobile" className="data-field" />
                            </div>
                        </div>
                        <div className="data-input">
                            Date of Birth
                            <div className="data-input-field center flex-row">
                                <select disabled={isWaiting} name="day" className="data-field">
                                    {
                                        days.map(elm => elm)
                                    }
                                </select>
                                <select disabled={isWaiting} name="month" className="data-field" placeholder="Month" >
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                                <select disabled={isWaiting} name="year" className="data-field">
                                    {
                                        years.map(elm => elm)
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="data-input">
                            Password
                            <div className="data-input-field center flex-row">
                                <input required autoComplete="off" type={passwordShowing ? "text" : "password"} disabled={isWaiting} name="password" className="data-field" placeholder="Password" />
                                <div className="eye-svg" onClick={() => {
                                    this.setPasswordShowing(!passwordShowing)
                                }}>
                                    {passwordShowing ? EyeSlash : Eye}
                                </div>
                            </div>
                        </div>
                        <div className="data-input">
                            Confirm Password
                            <input required autoComplete="off" type="password" disabled={isWaiting} name="confirm" className="data-field" placeholder="Confirm Password" />
                        </div>
                        {
                            output && <Message type="error" output={output} />
                        }
                        <button className="btn default-btn" onClick={() => {
                            this.updateForm();
                        }}>Update</button>
                    </form>
                </main>
            </>
        );
    }
}
