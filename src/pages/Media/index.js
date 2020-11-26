import React from 'react';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import './style.scss';
import Backend from '../../classes/Backend';
import Loading from '../../components/Loading';
import ElementList from '../../components/ElementList';

class Search extends React.Component {
    state = {
        loading: true,
        list: [],
    };

    mounted = false;

    constructor(props) {
        super(props);

        let urlParams = new URLSearchParams(this.props.location.search);
        Backend.find({
            title: urlParams.get('q') || this.props.title,
            type: urlParams.get('type') || this.props.type,
        }).then(({ response }) => this.mounted && this.setState({ loading: false, list: response }));
    }

    componentDidMount() {
        this.mounted = true;
        this.props.setBackground && this.props.setBackground('');
    }

    render() {
        if (this.state.loading) return <Loading />;

        return (
            <React.Fragment>
                {this.props.browserTitle ? (
                    <Helmet>
                        <title>{this.props.browserTitle}</title>
                    </Helmet>
                ) : undefined}
                {this.state.list.length ? (
                    <ElementList list={this.state.list} />
                ) : (
                    <div id={'no-result'}>
                        <div className={'dialog'}>
                            <h3>Kein Ergebnis</h3>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default withRouter(Search);
