import React from 'react';
import styles from './Main.module.css';
import SideBarItem from './SideBarItem';

import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import BuildIcon from '@material-ui/icons/Build';
import SchoolIcon from '@material-ui/icons/School';
import AcUnitIcon from '@material-ui/icons/AcUnit';

const SideBar = () => {    
    return (
        <div className={styles.sideBar}>
            <SideBarItem name='Teenus' value="Teenus" Icon={<BuildIcon />}/>
            <SideBarItem value="Rent" Icon={<SettingsApplicationsIcon />}/>
            <SideBarItem value="Koolitus" Icon={<SchoolIcon />}/>
            <SideBarItem value="Hange" Icon={<BusinessCenterIcon />}/>
            <SideBarItem value="Varia" Icon={<AcUnitIcon />}/>
        </div>
    )
}

export default SideBar
