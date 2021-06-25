import { ButtonBase } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logoDark from './../../assets/images/logo-dark.svg';
import logo from './../../assets/images/logo-light.svg';

//-----------------------|| MAIN LOGO ||-----------------------//

const LogoSection = ({ handleReload }) => {
    const customization = useSelector((state) => state.customization);

    return (
        <ButtonBase disableRipple component={Link} onClick={handleReload} to={{pathname: '/jobs', state: {returnToPage: { table: 'Jobs', pageNum: 1 }}}} >
            <img src={customization.navType === 'dark' ? logoDark : logo} alt="Folksaga" width="150" />
        </ButtonBase>
    );
};

export default LogoSection;
