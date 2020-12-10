import React, { Component, createRef } from "react";
import LottoResultForClass from "./LottoResultForClass";

class LottoForClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
           click: false
        };
    }

    startBtn = createRef();

    startLotto = () => {
        this.setState({
            click: true
        });

        this.startBtn.current.remove();
    };

    render() {
        return(
            <>
                <button ref={this.startBtn} onClick={this.startLotto}>시작!</button>
                { this.state.click ? <LottoResultForClass/> : null }
            </>
        );
    }
}

export default LottoForClass;