import React from 'react';
import {Logo} from '../components.jsx';
import {ClassName} from '../../const.js';

const Footer = () => (
  <footer className="page-footer">
    <Logo
      className={ClassName.LOGO_LINK_LIGHT}
    />
    <div className="copyright">
      <p>© 2019 What to watch Ltd.</p>
    </div>
  </footer>
);

export default Footer;
