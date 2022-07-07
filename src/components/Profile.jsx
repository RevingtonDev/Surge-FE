import React, { Component } from "react";

import { Face, Phone, Envelope } from "./Images";

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pop: false
        }
    }

    setPop(state) {
        this.setState({
            pop: state
        })
    }

    render() {
        const { type } = this.props;

        if (type === "dummy") return (
            <>
                <section className="dummy-profile profile-card dummy">
                </section>
            </>
        );


        const { pop } = this.state;
        if (!pop) {
            const { firstName, lastName, email } = this.props.user;
            return (
                <>
                    <section className="profile-card" onClick={() => {
                        this.setPop(true);
                    }}>
                        <div className="profile-logo" style={{ padding: '20px' }}>{Face}</div>
                        <div className="user-details">
                            {firstName && lastName && <div className="user-detail" style={{ margin: '5px', color: 'var(--wheat)' }}>{firstName + " " + lastName}</div>}
                            <div className="user-detail">
                                {email}
                            </div>
                        </div>
                    </section>
                </>
            );
        } else {
            const { firstName, lastName, email, temporary, mobile, status, accountType } = this.props.user;
            return (
                <>
                    <section className="profile-view screen-fill center flex-column">
                        <div className="profile center flex-column">
                            <div className="close center" onClick={() => {
                                this.setPop(false);
                            }}>
                                <span className="cross"></span>
                                <span className="cross"></span>
                            </div>
                            <div className="data-show-field user center flex-column  ">
                                {temporary ? "Temporary Account" : (firstName + " " + lastName)}
                                <div className="role">{accountType === 'admin' ? "Administrator" : "Student"}</div>
                            </div>
                            <div className="data-show-field center justify-start">
                                {Envelope}&nbsp;:&nbsp;&nbsp;
                                {email}
                            </div>
                            {!temporary && (
                                <div className="data-show-field center justify-start">
                                    {Phone}&nbsp;:&nbsp;&nbsp;
                                    +94&nbsp;{mobile}
                                </div>)}
                            <div className={"data-show-field status " + (status ? "" : "inactive")} style={{ textAlign: 'center' }}>{status ? "Active" : "Inactive."}</div>
                        </div>
                    </section>
                </>
            );
        }


    }
}
