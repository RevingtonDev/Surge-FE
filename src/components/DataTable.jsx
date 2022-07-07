import React, { Component } from "react";

import { Profile } from './Profile';

export class DataTable extends Component {
    render() {
        return (
            <>
                <section className="data-table">
                    <div className="table-head"></div>
                    <div className="table-data">
                        {
                            this.props.waiting ? (
                                <>
                                    <Profile type="dummy" />
                                    <Profile type="dummy" />
                                    <Profile type="dummy" />
                                    <Profile type="dummy" />
                                    <Profile type="dummy" />
                                    <Profile type="dummy" />
                                    <Profile type="dummy" />
                                    <Profile type="dummy" />
                                    <Profile type="dummy" />
                                    <Profile type="dummy" />
                                </>
                            ) : (
                                <>
                                    {
                                        this.props.data.map((elm) => {
                                            return (<Profile type="card" user={elm} key={elm.id} />)
                                        })
                                    }
                                </>
                            )
                        }
                    </div>
                    <div className="table-pagination"></div>
                </section>
            </>
        );
    }
}
