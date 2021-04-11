import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

class NavigationList extends Component {
    state = {};

    render() {
        let partIndex = 0;

        let data = this.props.serie;

        return (
            <div className={'season-container'}>
                {data.seasons[this.props.season].parts.map((part) => {
                    return (
                        <Link key={part.ytid} className={'part'} to={`/watch/${data._id}/${this.props.season}/${partIndex++}`}>
                            <span className={'part-preview'}>
                                <img className={'part-thumbnail'} src={part.thumbnail} alt={'Thumbnail'} />
                                <span className={'watch-indicator'} style={{ width: `${65}%` } /*TODO: Add length calculation*/} />
                            </span>
                            <span className={'part-info'}>
                                <span className={'part-index'}>
                                  Folge {partIndex}
                                </span>
                                <span className={'part-title'}>
                                  {part.title}
                                </span>
                                <p className={'part-description'}>
                                    Voluptatem quos ratione et perspiciatis et quos molestiae. Sint reprehenderit eum earum natus eius cupiditate itaque. Doloremque ab dolores nihil nihil. Molestias
                                    quo ipsum dicta. Aperiam est aut in enim nostrum velit eos odio.
                                </p>
                                <span className={'part-tags'}>
                                    <span>25min</span>
                                    <span />
                                    <span>11.12.2019</span>
                                </span>
                            </span>
                        </Link>
                    );
                })}
            </div>
        );
    }
}

export default NavigationList;
