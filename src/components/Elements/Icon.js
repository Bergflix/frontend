import React from "react";

const icons = {
    "profile": (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 16H17C19.7614 16 22 18.2386 22 21C22 21.5523 21.5523 22 21 22C20.4872 22 20.0645 21.614 20.0067 21.1166L19.9949 20.8237C19.907 19.3072 18.6928 18.093 17.1763 18.0051L17 18H7C5.34315 18 4 19.3431 4 21C4 21.5523 3.55228 22 3 22C2.44772 22 2 21.5523 2 21C2 18.3112 4.12231 16.1182 6.78311 16.0046L7 16H17H7ZM12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8C6 4.68629 8.68629 2 12 2ZM12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4Z" fill="black"/>
                </svg>)
}

class Icon extends React.Component {

    getSvg(type = "") {
        if(icons[type]) return icons[type];
        else return "N/A";
    }

    render() {
        return this.getSvg(this.props.type);
    }
}

export default Icon;
