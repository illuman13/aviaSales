import React from 'react';

import Filter from '../filters';
import Tabs from '../tabs';
import Tickets from '../tickets';

import LogoImage from './Logo.png';
// import S7Image from './S7 Logo.png';
import app from './app.module.scss';

const App = () => {
  return (
    <div className="block block--big">
      <div className={app.logo}>
        <img className={app.logoImg} src={LogoImage} alt="" />
      </div>
      <div className={app.list}>
        <Filter />
        <div className={app.tabs}>
          <Tabs />
          <Tickets />
        </div>
      </div>
    </div>
  );
};
export default App;
