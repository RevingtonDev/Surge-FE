import React, { Component } from "react";

import '../styles/loading.css'

export class LoadingUI extends Component {
    render() {
        return (
            <>
                <section className="loading-ui center flex-column">
                    <div className="progress-bar rounded center">
                        <span className="wheel"></span>
                    </div>
                    <div className="text">
                        Loading
                    </div>
                </section>
            </>
        );
    }
}
