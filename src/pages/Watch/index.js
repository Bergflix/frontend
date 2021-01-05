import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import YouTube from 'react-youtube';
import './style.scss';
import Backend from '../../classes/Backend';
import Loading from '../../components/Loading';

class Watch extends React.Component {
    state = {
        loading: true,
        error: false,
        fallback: '',
        ytid: null,
    };

    constructor(props) {
        super(props);
        const { key, part } = props.match.params;
        Backend.get(key)
            .then((data) => {
                let ytid;
                let fallback;
                switch (data.type) {
                    default: {
                        break;
                    }
                    case 'movies': {
                        ytid = data.ytid;
                        break;
                    }
                    case 'series': {
                        if (part) {
                            ytid = part;
                        } else {
                            // Fallback to the first episode
                            fallback = `/watch/${data._id}/${data.seasons[0].parts[0].ytid}`;
                        }
                        break;
                    }
                }
                console.log(fallback);
                this.setState({ loading: false, error: !ytid, fallback, ytid });
            })
            .catch(() => this.setState({ loading: false, error: true }));
    }

    componentDidMount() {
        this.props.setBackground && this.props.setBackground('');
    }

    render() {
        if (this.state.loading) return <Loading />;
        if (this.state.fallback) return <Redirect to={this.state.fallback} />;
        if (this.state.error) return <Redirect to={'/home'} />;

        return (
            <div id={'watch-container'}>
                <YouTube
                    containerClassName={'video-container'}
                    id={'video'}
                    videoId={this.state.ytid}
                    opts={{
                        enablejsapi: 1,
                        width: '100%',
                        height: '100%',
                        iv_load_policy: 3,
                        modestbranding: 1,
                        origin: 'bergflix.de',
                        rel: 0,
                        showinfo: 0,
                    }}
                />
            </div>
        );
    }
}

export default withRouter(Watch);
