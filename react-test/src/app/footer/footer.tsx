import React from 'react';
import { NavLink } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <NavLink className="footer-item" exact to="/" activeClassName="active">
        Home
      </NavLink>
      <NavLink className="footer-item" to="/chat" activeClassName="active">
        Chat
      </NavLink>
      <NavLink className="footer-item" to="/company" activeClassName="active">
        Company
      </NavLink>
    </div>
  );
};
