import { AppBar, CssBaseline, Toolbar, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { drawerWidth } from '../store/constant';
import { SET_MENU } from './../store/actions';
import Header from './Header';
import Sidebar from './Sidebar';

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        backgroundColor: theme.palette.background.default
    },
    appBarWidth: {
        transition: theme.transitions.create('width'),
        backgroundColor: theme.palette.background.default
    },
    appBarBottom: {
        top: 'auto',
        bottom: 0,
        backgroundColor: theme.palette.background.default
    },
    appBarWidthBottom: {
        top: 'auto',
        bottom: 0,
        transition: theme.transitions.create('width'),
        backgroundColor: theme.palette.background.default
    },
    content: {
        ...theme.typography.mainContent,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        padding: '6px',
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth - 20),
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '6px',
            marginTop: '86px'
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '6px',
            marginTop: '80px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '6px',
            marginRight: '10px',
            marginTop: '80px'
        }
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    }
}));

//-----------------------|| MAIN LAYOUT ||-----------------------//

const MainLayout = ({ children, searchText, filters, handleSearchText, handleFilters, handleReload }) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    const [_children, setChildren] = React.useState({});

    React.useEffect(() => {
        setChildren(children)
    }, [children])


    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        if (!leftDrawerOpened) {
            searchFiltersRef.current.focus();
        }
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };

    React.useEffect(() => {
        const openLeftDrawerState = (val) => {
            dispatch({ type: SET_MENU, opened: val });
        };
        openLeftDrawerState(matchUpMd);
    }, [dispatch, matchUpMd]);

    const searchFiltersRef = React.useRef();

    return (
        <div className={classes.root}>
            <CssBaseline />
            {/* header */}
            <AppBar position="fixed" color="inherit" elevation={0} className={leftDrawerOpened ? classes.appBarWidth : classes.appBar}>
                <Toolbar>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} searchText={searchText} filters={filters} handleSearchText={handleSearchText} handleReload={handleReload} />
                </Toolbar>
            </AppBar>

            {/* drawer */}
            <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} searchText={searchText} handleFilters={handleFilters} ref={searchFiltersRef} />

            {/* main content */}
            <main
                className={clsx([
                    classes.content,
                    {
                        [classes.contentShift]: leftDrawerOpened
                    }
                ])}
            >
                {/* Children + Breadcrumbs */}
                {children}
            </main>
        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node
};

export default MainLayout;
