import React from 'react';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import {
  IoIosMedkit,
  IoIosBook,
  IoIosPerson,
  IoIosChatboxes
} from 'react-icons/io';
import './footer.scss';

// import style from "./footer.module.scss";

import { withRouter } from 'react-router-dom';
import { StaticContext } from 'react-router';

export const Footer = withRouter(props => <FooterOrigin {...props} />);

export const FooterOrigin: React.FC<
  React.PropsWithChildren<RouteComponentProps<any, StaticContext, any>>
> = props => {
  // console.log(style);
  const { pathname } = props.location;
  const cur_style = {
    strokeWidth: 40,
    strokeLinejoin: 'round',
    strokeOpacity: 0.8,
    fillOpacity: 0
  };
  return (
    <div className="footer">
      <NavLink className={pathname === '/job' ? 'active' : ''} to="/job">
        <div className="icon-wrap">
          <IoIosMedkit />
        </div>
        <div className="name">职位</div>
      </NavLink>
      <NavLink
        className={pathname === '/company' ? 'active' : ''}
        to="/company"
        activeClassName="active"
      >
        <div className="icon-wrap">
          <IoIosBook />
        </div>
        <div className="name">公司</div>
      </NavLink>
      <NavLink
        className={pathname === '/chat' ? 'active' : ''}
        to="/chat"
        activeClassName="active"
      >
        <div className="icon-wrap">
          <IoIosChatboxes />
        </div>
        <div className="name">消息</div>
      </NavLink>
      <NavLink
        className={pathname === '/my' ? 'active' : ''}
        to="/my"
        activeClassName="active"
      >
        <div className="icon-wrap">
          <IoIosPerson />
        </div>
        <div className="name">我的</div>
      </NavLink>
    </div>
  );
};
