import React, { Component } from "react";

export class Pagination extends Component {
    render() {
        const { pages, page, setPage } = this.props;

        const paginationButtons = [];
        if (pages <= 5) {
            for (let i = 1; i <= Math.min(5, pages); i++) {
                paginationButtons.push(<div className="btn pag-btn" key={i} onClick={() => { setPage(i) }}>{i}</div>)
            }
        } else if (page < 4) {
            for (let i = 1; i <= 4; i++) {
                paginationButtons.push(<div className="btn pag-btn" key={i} onClick={() => { setPage(i) }}>{i}</div>);
            }
            paginationButtons.push(<div className="btn pag-btn dummy" key={-1}>...</div>);
            paginationButtons.push(<div className="btn pag-btn" key={pages} onClick={() => { setPage(pages) }}>{pages}</div>);
        } else if (pages - page < 3) {
            paginationButtons.push(<div className="btn pag-btn" key={1} onClick={() => { setPage(1) }}>1</div>);
            paginationButtons.push(<div className="btn pag-btn dummy" key={-1}>...</div>);
            for (let i = 3; i >= 0; i--) {
                paginationButtons.push(<div className="btn pag-btn" key={pages - i} onClick={() => { setPage(pages - i) }}>{pages - i}</div>);
            }
        } else {
            paginationButtons.push(<div className="btn pag-btn" key={1} onClick={() => { setPage(1) }}>1</div>);
            paginationButtons.push(<div className="btn pag-btn dummy" key={-1}>...</div>);
            for (let i = page - 1; i <= page + 1; i++) {
                paginationButtons.push(<div className="btn pag-btn" key={i} onClick={() => { setPage(i) }}>{i}</div>);
            }
            paginationButtons.push(<div className="btn pag-btn dummy" key={-2}>...</div>);
            paginationButtons.push(<div className="btn pag-btn" key={pages} onClick={() => { setPage(pages) }}>{pages}</div>);
        }
        return (
            <>
                {
                    paginationButtons.map(elm => elm)
                }
            </>
        );
    }
}

