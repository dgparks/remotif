import { Avatar, Badge, Box, ButtonBase, IconButton } from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import IconDark from '@material-ui/icons/Brightness2';
import IconLight from '@material-ui/icons/Brightness4';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { IconAdjustmentsHorizontal } from '@tabler/icons';
import ls from 'local-storage';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MENU_TYPE } from '../../store/actions.js';
import LogoSection from '../LogoSection';
import NotificationSection from './NotificationSection';
import SearchSection from './SearchSection';

// style constant
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    headerAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        transition: 'all .2s ease-in-out',
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
        color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary.dark,
        ['@media(hover)']: {
            '&:hover': {
                background: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.secondary.dark,
                color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.secondary.light
            }
        }
    },
    boxContainer: {
        width: '228px',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            width: 'auto'
        }
    },
    infoIcon: {
        height: '48px',
        alignItems: 'center',
        borderRadius: '27px',
        marginRight: '12px',
        transition: 'all .2s ease-in-out',
        color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary.main,
        ['@media(hover)']: {
            '&[aria-controls="menu-list-grow"], &:hover': {
                borderColor: theme.palette.primary.main,
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light + '!important',
            }
        },
    },
}));

const CustomizedBadge = withStyles((theme) => ({
    badge: {
        right: 4,
        top: 6,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px'
    }
}))(Badge);

//-----------------------|| MAIN NAVBAR / HEADER ||-----------------------//

const Header = ({ handleLeftDrawerToggle, searchText, filters, handleSearchText, handleReload }) => {

    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    const [navType, setNavType] = React.useState(ls.get('navType') || 'light');

    const iconThemeMode = navType === 'light' ? <IconLight /> : <IconDark />

    useEffect(() => {
        dispatch({ type: MENU_TYPE, navType: navType });
        ls.set('navType', navType);
    }, [dispatch, navType]);

    
    let filterIcon;
    const categoryCount = (filters.match(/ AND /g) || []).length;
    const subCategoryCount = (filters.match(/ OR /g) || []).length;
    const count = categoryCount + subCategoryCount;
    if (count > 0) {
        filterIcon = <CustomizedBadge color={theme.palette.mode === 'light' ? 'secondary' : 'primary'} badgeContent={count}><ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}> <Avatar variant="rounded" className={classes.headerAvatar} onClick={handleLeftDrawerToggle} title={customization.opened ? 'Hide Filters' : 'Show Filters'} color="inherit"> <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" /> </Avatar> </ButtonBase></CustomizedBadge>
    } else {
        filterIcon = <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}> <Avatar variant="rounded" className={classes.headerAvatar} onClick={handleLeftDrawerToggle} title={customization.opened ? 'Hide Filters' : 'Show Filters'} color="inherit"> <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" /> </Avatar> </ButtonBase>
    }

    return (
        <React.Fragment>
            {/* logo & toggler button */}
            <div className={classes.boxContainer}>
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection handleReload={handleReload} />
                </Box>
                {filterIcon}
            </div>

            {/* header search */}
            <div className={classes.grow}><SearchSection theme="light" searchText={searchText} filters={filters} handleLeftDrawerToggle={handleLeftDrawerToggle} handleSearchText={handleSearchText} /></div>
            
            {/* dark-mode + saved-jobs + about */}
            <IconButton title='Toggle Dark Mode' onClick={() => navType === 'light' ? setNavType('dark') : setNavType('light')}>
                {iconThemeMode}
            </IconButton>
            <NotificationSection />
            <IconButton title='About Remotif' className={classes.infoIcon} component={Link} to={'/about'}>
                <InfoOutlinedIcon />
            </IconButton>

        </React.Fragment>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
