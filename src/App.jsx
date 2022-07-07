import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createBrowserHistory } from "history";

import { authenticateUser, updateApp } from "./store";

import { E404 } from './pages/404'
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";

import { LoadingUI } from "./components/LoadingUI";
import { LoginForm } from "./components/LoginForm";

import { authorization, } from "./api/request";

import './styles/_global.css'
import './styles/component.css'
import { Admin } from "./pages/Admin";
import { Student } from "./pages/Student";
import { Update } from "./pages/Update";

export const App = () => {
    return (<AppComponent dispatch={useDispatch()} info={useSelector((state) => state)} />)
}

const Role = {
    Student: "student",
    Admin: "admin"
}

export class AppComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWaiting: false,
        }
        this.history = createBrowserHistory();
    }

    authorize() {
        if (this.props.isWaiting) return;

        this.setState({ isWaiting: true })
        authorization(true)
            .catch(e => {
                console.log(e);
            })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    this.props.dispatch(authenticateUser({
                        isAuthenticated: true,
                        user: res.results
                    }));
                } else {
                    this.props.dispatch(authenticateUser({
                        isAuthenticated: false,
                        user: null
                    }));
                }
            })
            .finally(() => {
                this.setState({ isWaiting: false });
            })
    }

    componentDidMount() {
        this.authorize();
    }

    componentDidUpdate() {
        if (this.props.info.user.shouldUpdate) {
            this.authorize();
            this.props.dispatch(updateApp({
                shouldUpdate: false
            }));
        }
    }

    render() {
        const { isAuthenticated, user } = this.props.info.user,
            { isWaiting } = this.state;

        if (isWaiting)
            return (
                <section className="page-loading content-page screen-fill">
                    <LoadingUI />
                </section>
            );

        return (
            <>
                <Router>
                    <Routes>
                        {
                            !isAuthenticated ?
                                <>
                                    <Route path="" element={<Home history={this.history} />} >
                                        <Route path="login" element={<LoginForm />} />
                                    </Route>
                                    <Route path="*" element={<E404 />} />
                                </>
                                :
                                !user.temporary ?
                                    <>
                                        <Route path="" element={<Layout history={this.history} />} >
                                            {
                                                user.accountType === Role.Admin ?
                                                    <>
                                                        <Route path="" element={<Admin />} />
                                                    </>
                                                    :
                                                    <>
                                                        <Route path="" element={<Student />} />
                                                    </>
                                            }
                                            <Route path="*" element={<E404 />} />
                                        </Route>
                                    </>
                                    :
                                    <>
                                        <Route path="" element={<Update />} />
                                    </>
                        }
                        <Route path="*" element={<E404 />} />
                    </Routes>
                </Router>
            </>
        )
    }
}
