import React, { Component, createRef } from "react";
import { Outlet, useParams } from "react-router-dom";
import { create_profile, get_users } from "../api/request";
import { DataTable } from "../components/DataTable";
import { Message } from "../components/Message";
import Indicator from "../components/Indicator";

import '../styles/admin_page.css'
import { Pagination } from "../components/Pagination";

export const Admin = () => {
    return <AdminComponent params={useParams()} />;
}

class AdminComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: this.props.params && this.props.params.page ? Math.max(this.props.params.page, 1) : 1,
            isWaiting: true,
            isCreating: false,
            data: [],
            pages: 0,
            elements: 0,
            output: "No results found.",
            filter: '.',
            shouldRefresh: false
        }
        this.profile = createRef();
        this.setPage = this.setPage.bind(this);
    }

    retrieveData(type) {
        this.setState({
            isWaiting: true,
            data: []
        })

        get_users(this.state.page, type, 10)
            .catch(e => {
                console.log(e);
            })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        data: res.results,
                        pages: res.pages,
                        elements: res.elements
                    })
                }
            })
            .finally(() => {
                this.setState({ isWaiting: false });
            });
    }

    create() {
        this.setState({
            isCreating: true,
            output: undefined
        })

        create_profile(this.profile.current)
            .catch(e => {
                this.setState({
                    output: {
                        type: "error",
                        message: "Unknown Error."
                    }
                })
            })
            .then(res => res.json())
            .then(res => {
                if (!res) {
                    this.setState({
                        output: {
                            type: "error",
                            message: "Unknown Error."
                        }
                    })
                }

                if (res.status === 200) {
                    this.setState({
                        output: {
                            type: "info",
                            message: "Account created and a notification email has been sent."
                        },
                        shouldRefresh: true
                    })
                } else {
                    this.setState({
                        output: {
                            type: "error",
                            message: res.query
                        }
                    })
                }
            })
            .finally(() => {
                this.setState({
                    isCreating: false,
                })
            });
    }

    componentDidMount() {
        this.retrieveData(this.state.filter);
    }

    componentDidUpdate() {
        if (this.state.shouldRefresh) {
            this.retrieveData(this.state.filter);
            this.setState({ shouldRefresh: false });
        }
    }

    setPage(page) {
        this.setState({ page: page, shouldRefresh: true });
    }

    render() {
        const { isWaiting, isCreating, output, pages, page } = this.state;

        return (
            <>
                <main className="content-page admin-page center flex-column justify-start" >
                    <section className="page-section create-account" style={{ width: '100%' }}>
                        <div className="section-title center flex-row">
                            Create Account
                            {isCreating ? <span className="indicator"><Indicator /></span> : ""}
                        </div>
                        {
                            output && <Message type={output.type} output={output.message} />
                        }
                        <form ref={this.profile} className="section-content" onSubmit={(e) => {
                            e.preventDefault();
                            this.create();
                        }}>
                            <input autoComplete="off" className="data-field" spellCheck={false} disabled={isCreating} required type="email" name="email" id="email" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z0-9]+" title="Please enter a valid email address." placeholder="Email" />
                            <input autoComplete="off" className="data-field" spellCheck={false} disabled={isCreating} required type="password" name="password" id="password" pattern=".{8,}" title="Password need to contain at least 8 characters." placeholder="Password" />
                            <select name="accountType">
                                <option value="admin">Administrator</option>
                                <option value="student">Student</option>
                            </select>
                            <button disabled={isCreating} className="btn default-btn">Create</button>
                        </form>
                    </section>
                    <div className="filter-section center flex-row" style={{
                        alignSelf: 'flex-start'
                    }}>
                        <div className="section-title"> Filter: </div>
                        <label htmlFor="all" className="data-field data-check" >
                            <input type="radio" disabled={isWaiting} name="filter" id="all" onChange={() => {
                                this.setState({ filter: '.', shouldRefresh: true });
                            }} />
                            All users
                        </label>
                        <label htmlFor="admins" className="data-field data-check" >
                            <input type="radio" disabled={isWaiting} name="filter" id="admins" onChange={() => {
                                this.setState({ filter: 'admin', shouldRefresh: true });
                            }} />
                            Administrators
                        </label>
                        <label htmlFor="students" className="data-field data-check" >
                            <input type="radio" disabled={isWaiting} name="filter" id="students" onChange={() => {
                                this.setState({ filter: 'student', shouldRefresh: true });
                            }} />
                            Students
                        </label>
                    </div>
                    <DataTable waiting={isWaiting} data={this.state.data} />
                    <section className="pagination center flex-row">
                        <Pagination page={page} pages={pages} setPage={this.setPage} />
                    </section>
                    <Outlet />
                </main>
            </>
        );
    }
}
