import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

import homeIcon from './icon/home.png';
import userIcon from './icon/user.png';
import calendarIcon from './icon/calendar.png';
import bedIcon from './icon/list-check.png';
import buildingIcon from './icon/apps.png';
import signOutIcon from './icon/cross.png';

function Sidebar() {
  return (
    <nav id="sidebar" className="bg-lightborder">
      <div className="position-fixed">
        <ul className="list-unstyled">
          <li>
            <Link className='nav' to="/home">
              <img src={homeIcon} alt="Home" />
              Home
            </Link>
          </li>
          <li>
            <Link className='nav' to="/usermanage">
              <img src={userIcon} alt="ผู้จอง" />
              ผู้จอง
            </Link>
          </li>
          <li>
            <Link className='nav' to="/calendar">
              <img src={calendarIcon} alt="ปฏิทิน" />
              ปฏิทิน
            </Link>
          </li>
          <li>
            <Link className='nav' to="/roomstatus">
              <img src={bedIcon} alt="สถานะ" />
              สถานะ
            </Link>
          </li>
          <li>
            <Link className='nav' to="/roommanage">
              <img src={buildingIcon} alt="สถานะห้องพัก" />
              สถานะห้องพัก
            </Link>
          </li>
          <li>
            <Link className='navv' to="/login">
              <img src={signOutIcon} alt="ออกจากระบบ" />
              ออกจากระบบ
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
