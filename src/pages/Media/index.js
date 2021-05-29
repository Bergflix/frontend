import { Fragment, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import './style.scss';
import Backend from '../../classes/Backend';
import Loading from '../../components/Loading';
import ElementList from '../../components/ElementList';
import { useEffect } from 'react';

const Search = (props) => {
  const [{ loading, list }, setState] = useState({ loading: true, list: [] });

  const m = useRef(true); // Mounted
  useEffect(() => () => m.current = false); // Unmounted

  useEffect(() => {
    let urlParams = new URLSearchParams(props.location.search);
    Backend.find({
      title: urlParams.get('q') || props.title,
      type: urlParams.get('type') || props.type,
    }).then((data) => {
      if (!m.current) return;
      setState({
        loading: false,
        list: data
      });
    });
  });

  useEffect(() => props.setBackground && props.setBackground(''));

  if (loading) return <Loading />;

  return (
    <Fragment>
      {props.browserTitle ? (
        <Helmet>
          <title>{props.browserTitle}</title>
        </Helmet>
      ) : undefined}
      {list.length ? (
        <ElementList type={props.type} list={list} />
      ) : (
        <div id={'no-result'}>
          <div className={'dialog'}>
            <h3>Kein Ergebnis</h3>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default withRouter(Search);
