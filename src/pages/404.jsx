import React, { Component } from "react";

export class E404 extends Component {
    render() {
        return (
            <>
                <section className="error-page screen-fill content-page center flex-column">
                    <code style={{
                        fontFamily: 'spartan',
                        fontSize: '7.5rem',
                        fontWeight: '500'
                    }}>404</code>
                    <div className="code-description" style={{
                        fontFamily: 'barlow',
                        fontSize: '2.5rem'
                    }}>Page Not Found</div>
                </section>
            </>
        );
    }
}
