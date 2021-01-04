import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

import Backend from '../../classes/Backend';
import Icon from '../../components/Elements/Icon';
import Loading from '../../components/Loading';

class PartySoon extends React.Component {
    state = {
        loading: true,
        list: [],
    };

    mounted = false;

    constructor(props) {
        super(props);
        // Choosing 5 random movies or series
        Backend.find({ title: '' }).then((data) => {
            let selectedList = [];
            for (let i = 0; i < 4; i++) {
                // Choose a random index
                let index = Math.floor(Math.random() * data.length);
                // Get the random picked entry
                selectedList.push(data[index]);
                // Remove the random entry from the still available entries so we don't get one twice
                data.splice(index, 1);
            }
            // Returning the list with 5 selected movies or series
            if (this.mounted) {
                this.setState({ loading: false, list: selectedList });
            } else {
                this.state = { loading: false, list: selectedList };
            }
        });
    }

    componentDidMount() {
        this.mounted = true;
        this.props.setBackground && this.props.setBackground('https://cdn.bergflix.de/thumbnails/Orion-Thumbnail.jpg');
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        if (this.state.loading) return <Loading />;

        return (
            <div id={'ps-container'}>
                <span className={'ps-info'}>
                    <p className={'ps-title'}>
                        Der <span>Partymodus</span> ist bald verfügbar!
                    </p>
                    <p>Sieh dir doch in der Zwischenzeit einen Film an:</p>
                </span>
                <span className={'ps-recommended'}>
                    {this.state.list.map((item) => (
                        <Link key={item._id} className={'ps-item'} to={`/media/${item._id}`}>
                            <img className={'item-image'} alt={'Thumbnail'} src={item.thumbnail} />
                            <span className={'item-link'}>
                                <Icon type={'arrow'} />
                                <span>Weitere Infos</span>
                            </span>
                        </Link>
                    ))}
                </span>
            </div>
        );
    }
}

export default PartySoon;
