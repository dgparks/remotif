import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography, useMediaQuery } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';
import MuiLink from '@material-ui/core/Link';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IconExternalLink } from '@tabler/icons';
import ls from 'local-storage';
import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import * as Realm from "realm-web";
import Breadcrumbs from './../../../ui-component/Breadcrumbs';
import Sidebar from './Sidebar';

const useStyles = makeStyles((theme) => ({
    root: {
        '& a': {
            color: '#2196f3',
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline'
            }
        }
    },
    container: {
        overflowY: 'hidden',
        display: 'flex',
        maxHeight: 'calc(100vh - 100px)',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        },
    },
    leftspacer: {
        width: '15%',
        [theme.breakpoints.down('lg')]: {
            width: '0px'
        },
    },
    middleContainer: {
        width: '60%',
        overflowY: 'hidden',
        minHeight: 'calc(100vh - 100px)',
        [theme.breakpoints.down('lg')]: {
            width: 'calc(95%)',
        },
        [theme.breakpoints.down('md')]: {
            width: 'calc(100%)',
        },
    },
    jobposting: {
        backgroundColor: theme.palette.mode === 'dark' ? '#29304a' : theme.palette.background.paper,
        color: theme.palette.mode === 'dark' ? theme.palette.text.primary : '',
        padding: theme.spacing(2, 0, 3),
        borderRadius: '8px',
        maxHeight: 'calc(100vh - 144px)',
        overflowY: 'scroll',
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#f5f5f5'
        },
        '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
            backgroundColor: '#f5f5f5',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ddd',
            border: '2px solid #d8d8d8',
        },
    },
    sidebarBorderBottom: {
        margin: '-12px 24px 16px 16px'
    },
    headerContainer: {
        padding: theme.spacing(0, 4, 0),
        [theme.breakpoints.down('sm')]: {
            padding: '0px 16px 0px 16px',
        },
    },
    titleLine: {
        marginTop: '-6px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginBottom: '24px',
        },
    },
    descriptionContainer: {
        padding: theme.spacing(0, 4, 0),
        height: 'fit-content',
        [theme.breakpoints.down('sm')]: {
            padding: '0px 16px 0px 16px',
        },
    },
    description: {
        height: 'fit-content',
        paddingBottom: '50px',
    },
    rightspacer: {
        width: '20%',
        [theme.breakpoints.down('lg')]: {
            width: '0px'
        },
    },
    multilocContent: {
        paddingTop: '4px',
    }
}));

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.mode === 'dark' ? theme.palette.getContrastText(grey[500]) : theme.palette.getContrastText(grey[400]),
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[400],
        ['@media(hover)']: {
            '&:hover': {
                backgroundColor: theme.palette.primary.main
            },
        },
    },
}))(Button);

const JobPosting = props => {

    const theme = useTheme();
    const classes = useStyles();
    
    const matchesXS = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const [isLoading, setLoading] = React.useState(true);
    const [state, setState] = React.useState({
        savedJobs: ls.get('savedJobs') || [],
        jobData: {}
    });

    const location = useLocation();
    const path = props.location.pathname;
    const returnToPage = location.state && location.state.returnToPage ? location.state.returnToPage : { table: 'Jobs', pageNum: 1 };

    const app = Realm.App.getApp(process.env.REACT_APP_REALM_APP_ID);
    const mongodb = app.currentUser.mongoClient("mongodb-atlas");
    const jobs = mongodb.db("jobscraper").collection("jobs");

    const decodeHTMLEntities = encoded_string => {
        let textArea = document.createElement('textarea');
        textArea.innerHTML = encoded_string;
        return textArea.value;
    }

    React.useEffect(() => {
        jobs.findOne({ slug: path.slice(6) })
            .then(data => {
                setState({
                    jobData: data, savedJobs: state.savedJobs
                });
                setLoading(false);
            });
    }, []);

    if (isLoading && state.savedJobs.length) {
        return <div />
    };

    const pageTitle = state.jobData.company + ' - ' + state.jobData.title + ' | Remotif'
    const canonicalUrl = 'https://remotif.io/jobs/' + state.jobData.slug;

    const mobileHeaderContainer = (
        <div className={classes.headerContainer}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <img src={state.jobData.logo} style={{ height: '72px' }} alt="logo" />
                <div style={{ display: 'flex', flexGrow: '9999', flexDirection: 'column', marginLeft: "8px", justifyContent: 'flex-start' }}>
                    <Typography variant="subtitle3" style={{ lineHeight: '100%' }}>{state.jobData.title}</Typography>
                    <Typography variant="subtitle4">at {state.jobData.company} (<MuiLink href={state.jobData.apply_url} color={state.jobData.expired !== false ? 'error': 'primary'} target="_blank">{state.jobData.expired !== false ? 'expired' : 'apply now'} <IconExternalLink size="0.9rem" style={{ marginBottom: '-2px' }} /></MuiLink>)</Typography>
                </div>
            </div>
            <div style={{ marginTop: '12px', marginBottom: '12px', marginRight: '6px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid #80808044', paddingBottom: '10px' }}>
                    <Typography style={{ lineHeight: '100%' }} variant="subtitle4">Location: {state.jobData.location}</Typography>
                    <Typography variant="subtitle4">Job Category: {state.jobData.category}</Typography>
                </div>
            </div>
        </div>
    );

    let multiloc = []
    if (state.jobData.multiloc && state.jobData.multiloc.length > 0) {
        state.jobData.multiloc.forEach(item => {
            multiloc.push(<MuiLink href={item.apply_url} target="_blank">{item.location}</MuiLink>)
        })
    }

    const nonMobileHeaderContainer = (
        <div className={classes.headerContainer}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={state.jobData.logo} style={{ maxHeight: '72px' }} alt="logo" />
                <span style={{ marginLeft: '8px', fontSize: '24px', fontWeight: '700' }}>{state.jobData.company}</span>
            </div>
            <div className={classes.titleLine}>
                <div>
                    <h2 style={{ fontSize: '28px', fontWeight: '700', lineHeight: '100%' }}>{state.jobData.title}</h2>
                </div>
                <div>
                    <ColorButton style={{ padding: '12px', maxHeight: '40px', minHeight: '40px', minWidth: 'fit-content', whiteSpace: 'nowrap' }} variant="contained" color="primary" href={state.jobData.apply_url} target="_blank">
                        <IconExternalLink />&nbsp;{state.jobData.expired !== false ? 'EXPIRED' : 'APPLY NOW'}
                    </ColorButton>
                </div>
            </div>
            <div style={{ borderBottom: '1px solid #80808044', marginBottom: '8px' }}>
                {multiloc.length > 0 ?
                        <div>
                            <Accordion
                                style={{padding: '0px', margin: '0px', height: 'fit-content', backgroundColor: theme.palette.mode === 'dark' ? '#29304a' : null }}
                            >
                                <AccordionSummary
                                    classes={{content: classes.multilocContent}}
                                    style={{padding: '0px', marginBottom: '0px', width: 'fit-content', minHeight: '28px', maxHeight: '28px'}}
                                    expandIcon={<ExpandMoreIcon style={{color: theme.palette.mode === 'dark' ? '#97a0c0' : '808080'}} />}
                                    aria-controls="locations"
                                    id="multiloc"
                                >
                                    <h4 style={{ color: theme.palette.mode === 'light' ? '#808080' : '#97a0c0', marginTop: '-4px', marginBottom: '0px' }}>Location: Remote (Multiple Locations)</h4>
                                </AccordionSummary>
                                <AccordionDetails style={{padding: '0px', marginBottom: '6px'}}>
                                    <div style={{display: 'flex', flexWrap: 'wrap'}}>{multiloc.map(item => <div>{item},&nbsp;</div> )}</div>
                                </AccordionDetails>
                            </Accordion>
                            <h4 style={{ color: theme.palette.mode === 'light' ? '#808080' : '#97a0c0', marginTop: '-4px' }}>Job Category: {state.jobData.category}</h4>
                        </div>
                    :
                    <h4 style={{ color: theme.palette.mode === 'light' ? '#808080' : '#97a0c0', marginTop: '-4px' }}>Location: {state.jobData.location}
                        <br />Job Category: {state.jobData.category}</h4>
                }
            </div>
        </div>
    );

    return (
        <div className="jobposting">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{pageTitle}</title>
                <link rel="canonical" href={canonicalUrl} />
            </Helmet>
            <div className={classes.container}>
                <div className={classes.leftspacer} />
                {matchesXS ? <div /> :
                    <Sidebar savedJobs={state.savedJobs} _id={state.jobData._id} canonicalUrl={canonicalUrl} pageTitle={pageTitle} returnToPage={returnToPage} />
                }
                <div className={classes.middleContainer}>
                    <Breadcrumbs navigation={state.jobData.company + ' - ' + state.jobData.title} icon />
                    <div className={classes.jobposting}>
                        {matchesXS ?
                            <div>
                                <Sidebar savedJobs={state.savedJobs} _id={state.jobData._id} canonicalUrl={canonicalUrl} pageTitle={pageTitle} returnToPage={returnToPage} />
                                <Divider className={classes.sidebarBorderBottom} />
                                {mobileHeaderContainer}
                            </div>
                            : <div>{nonMobileHeaderContainer}</div>
                        }
                        <div className={classes.descriptionContainer}>
                            <div className={classes.description}>
                                <div className={classes.root} dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(state.jobData.description) }} />
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