import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

const ElementList = (props) => {
  if (!props.list) return;

  return (
    <div id={'list-container'}>
      <div className={'list'}>
        {props.list.map((item) => (
          <Link key={item._id} className={'list-item'} to={`/${props.type || 'media'}/${item._id}`}>
            <img className={'item-image'} alt={'Thumbnail'} src={item.thumbnail} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ElementList;
