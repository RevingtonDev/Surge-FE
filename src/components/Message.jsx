import React, { Component } from "react";

import { Error } from "./Images";

export class Message extends Component {
    render() {
        const { type } = this.props;

        return (
            <section className={"message center flex-row " + type}>
                <div className="icon center">
                    {Error}
                </div>
                <div className="message">
                    {this.props.output}
                </div>
            </section>
        );
    }
}
