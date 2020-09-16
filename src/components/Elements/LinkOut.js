import React from "react";

class LinkOut extends React.Component {

    componentDidMount() {
        if(this.props.to) {
            window.open(this.props.to,'_blank');
            window.history.back();
        }
    }

    render() {
        return (<React.Fragment/>);
    }
}

export default LinkOut;
