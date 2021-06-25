import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import ls from 'local-storage'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton, Checkbox } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

// share buttons
import {
    EmailShareButton,
    LinkedinShareButton,
    FacebookShareButton,
    TwitterShareButton,

} from "react-share";
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedinIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles((theme) => ({
    sidebar: {
        width: '5%',
        minWidth: '72px',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            // paddingLeft: '6px',
            paddingRight: '12px',
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: '12px',
            marginTop: '-12px',
        },
    },
    backbutton: {
        marginLeft: '6px',
        marginTop: '50px',
        transition: 'all .2s ease-in-out',
        background: theme.palette.mode === 'dark' ? '' : theme.palette.background.default,
        ['@media(hover)']: {
            '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : '#e3f2fd',
            },
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '0px',
            marginLeft: '0px',
        },
    },
    savebutton: {
        marginLeft: '6px',
        marginTop: '18px',
        height: '48px',
        width: '48px',
        transition: 'all .2s ease-in-out',
        background: theme.palette.mode === 'dark' ? '' : theme.palette.background.default,
        color: theme.palette.error.light + '!important',
        ['@media(hover)']: {
            '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : '#e3f2fd',
            },
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '0px',
            marginLeft: '0px',
        },
    },
    sharebutton: {
        marginLeft: '6px',
        marginTop: '18px',
        transition: 'all .2s ease-in-out',
        background: theme.palette.mode === 'dark' ? '' : theme.palette.background.default,
        color: '#2196f3',
        ['@media(hover)']: {
            '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : '#e3f2fd',
            },
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '0px',
            marginLeft: '0px',
        },
    },
}));

const Sidebar = (props) => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        savedJobs: ls.get('savedJobs') || [],
        jobData: {}
    });

    const history = useHistory();

    const handleChange = (event) => {
        let currentSavedJobs = state.savedJobs;
        if (event.target.checked) {
            let newSavedJobs = [props._id, ...currentSavedJobs];
            setState({
                savedJobs: newSavedJobs,
                jobData: state.jobData
            });
            ls.set('savedJobs', newSavedJobs);
        }
        else {
            let newSavedJobs = currentSavedJobs.filter(item => item !== props._id)
            setState({
                savedJobs: newSavedJobs,
                jobData: state.jobData
            });
            ls.set('savedJobs', newSavedJobs);
        }
    };

    return (
        <div className={classes.sidebar}>
            <IconButton className={classes.backbutton} onClick={() => history.push({
                pathname: !props.returnToPage ? '/jobs' : props.returnToPage.table === 'Jobs' ? '/jobs' : '/savedjobs',
                state: { returnToPage: props.returnToPage }
            })}>
                <ArrowBackIcon />
            </IconButton>
            <Checkbox
                className={classes.savebutton}
                checkedIcon={<FavoriteIcon color="inherit" />}
                icon={<FavoriteBorderIcon color="inherit" />}
                checked={state.savedJobs.includes(props._id) ? true : false}
                onChange={handleChange}
            >
            </Checkbox>
            <EmailShareButton
                url={props.canonicalUrl}
                subject={props.pageTitle}
            >
                <IconButton className={classes.sharebutton}>
                    <EmailIcon style={{ color: "#89A894" }} />
                </IconButton>
            </EmailShareButton>
            <FacebookShareButton
                url={props.canonicalUrl}
                quote={props.pageTitle}
            >
                <IconButton className={classes.sharebutton}>
                    <FacebookIcon style={{ color: "#4267B2" }} />
                </IconButton>
            </FacebookShareButton>
            <TwitterShareButton
                url={props.canonicalUrl}
                title={props.pageTitle}
            >
                <IconButton className={classes.sharebutton}>
                    <TwitterIcon style={{ color: "#1DA1F2" }} />
                </IconButton>
            </TwitterShareButton>
            <LinkedinShareButton
                url={props.canonicalUrl}
                title={props.pageTitle}
            >
                <IconButton className={classes.sharebutton}>
                    <LinkedinIcon style={{ color: "#0a66c2" }} />
                </IconButton>
            </LinkedinShareButton>
        </div>
    )

}

export default Sidebar