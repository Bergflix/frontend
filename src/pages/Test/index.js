import React from "react";

class Test extends React.Component {
    constructor(props) {
        super(props);


        const ws = new WebSocket("ws://127.0.0.1:6463/?v=1&client_id=709114073853329419&encoding=json");
        ws.onopen = r => {
            console.log("OPEND", r)

            ws.send(JSON.stringify({cmd: "SET_ACTIVITY", args: {state: "Test state", details: "Test details", instance: false}}))
        };
        ws.onclose = r => console.log("CLOSED", r);
        ws.onmessage = r => console.log("MESSAGE", r);
    }

    render() {
        return (
            <div>
                <h2>Test Page</h2>
            </div>
        );
    }
}

export default Test;
