import React, { Component, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { deauthenticate, search_profile } from "../api/request";
import { updateApp } from "../store";

import { LoadingUI } from './LoadingUI';
import { DataTable } from './DataTable'
import { Pagination } from './Pagination'
import { Message } from './Message'

import { Search } from './Images';

import '../styles/nv.css'

export const Navbar = () => {
    return <NavbarComponent dispatch={useDispatch()} info={useSelector(state => state.user.user)} />
}

class NavbarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: undefined,
            isSearching: false,
            searchData: [],
            isSearchBarOpen: false,
            page: 1,
            pages: 0,
            output: null
        }
        this.searchBar = createRef();
        this.setPage = this.setPage.bind(this);
    }

    setPage(page) {
        this.setState({ page: page });
        this.search();
    }

    logout() {
        deauthenticate()
            .finally(() => {
                this.props.dispatch(updateApp({ shouldUpdate: true }));
                this.setState({ redirect: '/', isWaiting: false })
            });
    }

    search() {
        this.setState({
            searchData: [],
            pages: 0,
            isSearching: false,
            output: null
        });

        search_profile(this.searchBar.current.value, this.state.page, 10)
            .catch(e => {
                this.setState({
                    output: "Something went wrong."
                })
            })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        searchData: res.results,
                        pages: res.pages,
                        output: (res.results.length === 0 ? "No results found." : null)
                    })
                } else {
                    this.setState({
                        output: res.query
                    })
                }
            })
            .finally(() => {
                this.setState({
                    isSearching: false
                })
            })
    }

    render() {
        const { firstName, lastName, accountType } = this.props.info,
            { redirect, isSearching, isSearchBarOpen, page, pages, output, searchData } = this.state;

        if (redirect) {
            return (<Navigate to={redirect} replace={true} state={{ shouldUpdate: true }} />);
        }

        return (
            <>
                <section className="nav-controller">
                    <span className="block"></span>
                    <span className="block"></span>
                    <span className="block"></span>
                </section>
                <nav className="nv-bar center">
                    <div className="title center flex-row">
                        <div className="title-content">Surge</div>
                        <span className="role">{accountType === 'admin' ? "Administrator" : "Student"}</span>
                    </div>
                    {
                        accountType === 'admin' ?
                            <section className="nv-search center flex-row">
                                <div className="search-bar center flex-row">
                                    {Search}
                                    <input ref={this.searchBar} type="text" onClick={() => {
                                        if (!isSearchBarOpen) {
                                            this.setState({ isSearchBarOpen: true })
                                        }
                                    }} onKeyUp={(e) => {
					if (e.key === "Enter") {
						this.search();
					}
				}}/>
                                </div>
                                <button className="btn default-btn" onClick={() => {
                                    this.search();
                                }}>Search
                                </button>
                                <section className={"search-results center flex-column justify-start " + (isSearchBarOpen ? "" : "invisible")}>
                                    <div className="close" onClick={() => {
                                        this.setState({ isSearchBarOpen: false, searchData: [], pages: 0, page: 1 })
                                    }}>
                                        <span className="cross"></span>
                                        <span className="cross"></span>
                                    </div>
                                    {
                                        output && <Message type="error" output={output} />
                                    }
                                    {
                                        isSearching ?
                                            <LoadingUI /> :
                                            <>
                                                <DataTable waiting={false} data={searchData} />
                                                <section className="pagination center flex-row">
                                                    <Pagination page={page} pages={pages} setPage={this.setPage} />
                                                </section>
                                            </>
                                    }
                                </section>
                            </section> : <></>
                    }
                    <section className="client center flex-row">
                        <div className="client-name"> {firstName + " " + lastName} </div>
                        <div className="btn default-btn logout" disabled style={{ width: 'fit-content' }} onClick={() => {
                            this.logout();
                        }}>
                            Logout
                        </div>
                    </section>
                </nav>
            </>
        );
    }
}