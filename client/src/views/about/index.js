import MuiLink from '@material-ui/core/Link';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from "react";
import { Helmet } from "react-helmet";
import IconDark from '../../assets/images/icon_dark.png';
import IconLight from '../../assets/images/icon_light.png';
import Breadcrumbs from './../../ui-component/Breadcrumbs';

const useStyles = makeStyles((theme) => ({
    container: {
        overflowY: 'hidden',
        display: 'flex',
        maxHeight: 'calc(100vh - 142px)',
        [theme.breakpoints.down('lg')]: {
            flexDirection: 'column'
        },
    },
    leftspacer: {
        width: '20%',
        [theme.breakpoints.down('lg')]: {
            width: '0px'
        },
    },
    homeButton: {
        marginLeft: '6px',
        marginTop: '18px',
        transition: 'all .2s ease-in-out',
        background: theme.palette.mode === 'dark' ? '' : theme.palette.background.default,
        [theme.breakpoints.down('lg')]: {
            marginRight: '12px',
        },
    },
    middleContainer: {
        minWidth: '60%',
        height: 'calc(100vh - 142px)',
    },
    aboutContainer: {
        backgroundColor: theme.palette.mode === 'dark' ? '#29304a' : theme.palette.background.paper,
        color: theme.palette.mode === 'dark' ? theme.palette.text.primary : '',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 0, 3),
        minHeight: '100%',
        borderRadius: '8px',
        overflowY: 'hidden',
        [theme.breakpoints.down('lg')]: {
            minWidth: 'calc(100%)',
            maxHeight: 'fit-content',
        },
    },
    headerContainer: {
        padding: theme.spacing(0, 4, 0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    titleLine: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    tagLine: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    byLine: {
        borderBottom: '1px solid #80808044',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    descriptionContainer: {
        justifyContent: 'center',
        display: 'flex',
        padding: theme.spacing(0, 4, 0),
        overflowY: 'hidden',
    },
    description: {
        height: 'fit-content',
        marginTop: '20px',
        paddingBottom: '50px'

    },
    rightspacer: {
        width: '20%',
        [theme.breakpoints.down('lg')]: {
            width: '0px'
        },
    },
}));

const JobPosting = () => {

    const theme = useTheme();
    const Logo = theme.palette.mode === 'light' ? IconLight : IconDark
    const classes = useStyles();

    return (
        <div className="jobposting">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Remotif - About</title>
                <link rel="canonical" href={'https://remotif.io/about'} />
            </Helmet>
            
            <div className={classes.container}>
                <div className={classes.leftspacer} />
                <div className={classes.middleContainer}>
                    <Breadcrumbs navigation={'About'} icon />
                    <div className={classes.aboutContainer}>
                        <div className={classes.headerContainer}>
                            <div className={classes.titleLine}>
                                <div><h2 style={{ fontSize: '28px', fontWeight: '700', lineHeight: '10%'}}>rem</h2></div>
                                <div style={{marginLeft: '0px', marginTop: '12px', marginRight: '1px'}}><img src={Logo} alt="logo" height="18px" /></div>
                                <div><h2 style={{ fontSize: '28px', fontWeight: '700', lineHeight: '10%'}}>tif</h2></div>
                            </div> 
                            <div className={classes.tagLine}>
                                <div><h4 style={{marginTop: '-8px', marginBottom: '6px', color: theme.palette.mode === 'light' ? '#808080' : '#97a0c0'}}>home is where</h4></div>
                                <div><h4 style={{marginTop: '-8px', marginBottom: '6px', color: theme.palette.mode === 'light' ? '#808080' : '#97a0c0'}}>the heart</h4></div>
                                <div><h4 style={{marginTop: '-8px', marginBottom: '20px', color: theme.palette.mode === 'light' ? '#808080' : '#97a0c0'}}>is</h4></div>
                            </div>
                            <div className={classes.byLine}>
                                <div><h4 style={{color: theme.palette.mode === 'light' ? '#808080' : '#97a0c0', marginTop: '-4px', marginBottom: '16px'}}>Created by <MuiLink href="https://dgparks.io" target="_blank">Devon Parks</MuiLink>.</h4></div>
                            </div>
                        </div>
                        <div className={classes.descriptionContainer}>
                            <div className={classes.description}>
                                More information coming soon...
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.rightspacer} />
            </div>
        </div>
    );
};

export default JobPosting;