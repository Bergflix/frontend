import { NavLink } from 'react-router-dom';
import './style.scss';

import Icon from '../Elements/Icon';

const Playlist = (props) => {
  const { series, season, part } = props;

  let partIndex = 0;

  return (
    <div className={'playlist'}>
      <span className={'info'}>
        <span className={'head'}>
          <Icon className={'icon'} type={'video'} />
          <div className={'title'}>{series.title}</div>
        </span>
        <div className={'tags'}>
          <span className={'left'}>
            <span>{new Date(series.date).getFullYear()}</span>
            <span>{series.age}+</span>
            <span>{series.genre}</span>
          </span>
          <span className={'right'}>
            <span>
              {Number(part) + 1}/{series.seasons[0].parts.length}
            </span>
          </span>
        </div>
      </span>
      <span className={'list'}>
        {series.seasons[0].parts.map((part) => (
          <NavLink
            key={part.ytid}
            className={'part'}
            to={`/watch/${series._id}/${season}/${partIndex++}`}
          >
            <img
              className={'part-thumbnail'}
              src={part.thumbnail}
              alt={'Thumbnail'}
            />
            <span className={'part-info'}>
              <span className={'part-title'}>{part.title}</span>
              <span className={'part-tags'}>
                <span>Folge {partIndex}</span>
                <span className={'dot'} />
                <span>12.01.2020</span>
                <span className={'dot'} />
                <span>25min</span>
              </span>
            </span>
          </NavLink>
        ))}
      </span>
    </div>
  );
};

export default Playlist;
