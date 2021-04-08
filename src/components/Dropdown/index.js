import React from 'react';
import './style.scss';
import Icon from '../Elements/Icon';
import { Link /* NavLink*/ } from 'react-router-dom';

class Sidebar extends React.Component {
  entries = [
    [
      {
        icon: 'user',
        href: '/profile',
        title: 'Mein Profil',
      },
      {
        icon: 'settings',
        href: '/settings',
        title: 'Einstellungen',
      },
      {
        icon: 'bookmark',
        href: '/favorites',
        title: 'Favoriten',
      },
      {
        icon: 'info',
        href: '/help',
        title: 'Hilfe & Feedback',
      },
      {
        icon: 'turn-off',
        href: '/signout',
        title: 'Abmelden',
      },
    ],
    [
      {
        href: '/discord',
        title: 'Discord',
      },
      {
        href: '/twitter',
        title: 'Twitter',
      },
      {
        href: '/patreon',
        title: 'Patreon',
      },
    ],
  ];

  isOpener(target) {
    if (!target || target.tagName === 'BODY') return false;
    if (!target.classList.contains('nav-profile')) return this.isOpener(target.parentElement);
    return true;
  }

  isSidebar(target) {
    if (!target || target.tagName === 'BODY') return false;
    if (target.id !== 'sidebar-container') return this.isSidebar(target.parentElement);
    return true;
  }

  componentDidMount() {
    document.addEventListener('click', ({ target }) => {
      if (this.props.open && !this.isOpener(target) && !this.isSidebar(target)) this.props.toggle();
    });
  }

  render() {
    return (
      <div id={'sidebar-container'} className={this.props.open ? '' : 'hide'}>
        {this.entries.map((group) => {
          return (
            <span className={'group'}>
              {group.map((entry) => {
                return (
                  <Link to={entry.href} className={'entry'}>
                    {entry.icon && <Icon className={'icon'} type={entry.icon} />}
                    <span>{entry.title}</span>
                  </Link>
                );
              })}
            </span>
          );
        })}
      </div>
    );
  }
}

export default Sidebar;
