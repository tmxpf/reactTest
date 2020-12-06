import React, { PureComponent, createRef } from 'react';

class ResponseCheckForClass extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            state: 'waiting',
            message: '클릭해서 시작하세요.',
            result: []
        };
    };

    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const { state } = this.state;

        if(state === 'waiting') {
            this.setState({
                state: 'ready',
                message: '기다리세요. 곧 시작합니다.'
            });
            this.timeout = setTimeout(() => {
                                    this.setState({
                                        state: 'now',
                                        message: '지금 클릭'
                                    });
                                    this.startTime = new Date();
                                }, Math.floor(Math.random() * 1000) + 2000);
        }

        if(state === 'ready') {
            clearTimeout(this.timeout);
            this.setState({
                state: 'waiting',
                message: '준비상태에서 클릭하시면 안됩니다!'
            });
            setTimeout(() => {
                this.setState({
                    message: '클릭해서 시작하세요.'
                });
            }, 1000);
        }

        if(state === 'now') {
            this.endTime = new Date();
            this.setState((prevState) => {
                return { state: 'waiting',
                            message: '클릭해서 시작하세요.',
                            result: [...prevState.result, this.endTime - this.startTime]
                         };
            });
            console.log(this.endTime - this.startTime);
        }
    };

    onButtonClick = () => {
        if(this.timeout) {
            clearTimeout(this.timeout);
        }
        this.setState({
            state: 'waiting',
            message: '클릭해서 시작하세요.',
            result: []
        });
    };

    renderAverage = () => {
        const { result } = this.state;

        return (result.length === 0) ? null : <><div>평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms</div><button onClick={this.onButtonClick}>리셋</button></>;
    };

    render() {
        const { state, message } = this.state;

       return(
            <>
                <div id="screen" className={state} onClick={this.onClickScreen}>
                    {message}
                </div>
                {this.renderAverage()}
            </>
       );
    };

}

export default ResponseCheckForClass;
