import React, { useState } from 'react';
import {
  ReactComponent as TroublesLeftMenuIcon
} from '../../assets/troubles-left-menu-icon.svg';
import './leftMenu.css';

const LeftMenu = () => {
  const [currentTab, setCurrentTab] = useState(1);
  
  const onTabClick = (tab) => {
    setCurrentTab(tab);
  };
  
  return (
    <div className='left-menu'>
      <div className='left-menu-tabs'>
        <div
          className={currentTab === 1 ? 'left-menu-tab-item-selected' : 'left-menu-tab-item'}
          onClick={() => onTabClick(1)}
        >
          <TroublesLeftMenuIcon/>
          <strong>Аварии</strong>
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;