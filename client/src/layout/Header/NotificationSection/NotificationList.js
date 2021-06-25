import {
    Avatar,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ls from 'local-storage';
import React from 'react';
import { useHistory } from 'react-router-dom';
import jobs from '../../../assets/data/jobs_nodesc.json';


// style constant
const useStyles = makeStyles((theme) => ({
    navContainer: {
        width: '100%',
        maxWidth: '330px',
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '300px'
        }
    },
    listAction: {
        top: '22px',
    },
    actionColor: {
        color: theme.palette.grey[500]
    },

    listItem: {
        padding: 0
    },
    sendIcon: {
        marginLeft: '8px',
        marginTop: '-3px'
    },
    listDivider: {
        marginTop: 0,
        marginBottom: 0
    },
    listChipError: {
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.orange.light,
        height: '24px',
        padding: '0 6px',
        marginRight: '5px'
    },
    listChipWarning: {
        color: theme.palette.warning.dark,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
        height: '24px',
        padding: '0 6px'
    },
    listChipSuccess: {
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light,
        height: '24px',
        padding: '0 6px'
    },
    listAvatarSuccess: {
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light,
        border: theme.palette.mode === 'dark' ? '1px solid' : 'none',
        borderColor: theme.palette.success.main
    },
    listAvatarPrimary: {
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
        border: theme.palette.mode === 'dark' ? '1px solid' : 'none',
        borderColor: theme.palette.primary.main
    },
    listContainer: {
        paddingLeft: '56px'
    },
    logo: {
        // marginTop: '20px',
        maxWidth: 'fit-content',
        flexGrow: '0',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
    },
    jobInfo: {
        flexGrow: '1000',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        maxWidth: '100%'
    },
    uploadCard: {
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light
    },
    itemAction: {
        display: 'flex !important',
        cursor: 'pointer',
        padding: '16px',
        ['@media(hover)']: {
            '&:hover': {
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light
            },
        }
    },
    jobTitle: {
        marginTop: '0px !important',
        marginBottom: '-3px !important',
        textOverflow: 'ellipsis'
    }
}));


//-----------------------|| NOTIFICATION LIST ITEM ||-----------------------//

const NotificationList = ({ handleClose }) => {
    const classes = useStyles();
    const savedJobs = ls.get('savedJobs') || [];

    const history = useHistory();
    const HandleOpen = (e, _job) => {
        history.push({
            pathname: `/jobs/${_job.slug}`,
            state: { _id: _job._id.$oid }
        })
        handleClose(e);
    };

    return (
        <List className={classes.navContainer}>
            {savedJobs.slice(0, 5).map(function (_id) {

                const job = jobs.find(item => {
                    return item._id.$oid === _id
                })

                return (
                    <React.Fragment key={job._id.$oid}>
                        <div className={classes.itemAction} onClick={(e) => HandleOpen(e, job)}>
                            <div className={classes.logo}>
                                <ListItem alignItems="center" className={classes.listItem}>
                                    <ListItemAvatar>
                                        <Avatar alt={job.company} src={job.logo} style={{ backgroundColor: "#fff" }} />
                                    </ListItemAvatar>
                                </ListItem>
                            </div>
                            <div className={classes.jobInfo}>
                                <ListItem alignItems="center" className={classes.listItem}>
                                    <ListItemText className={classes.jobTitle} primary={<Typography noWrap variant="subtitle1">{job.title}</Typography>} />
                                </ListItem>
                                <Grid container direction="column">
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2">{job.company}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography noWrap variant="subtitle2">{job.location}</Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                        <Divider className={classes.listDivider} />
                    </React.Fragment>
                );
            })}
        </List>
    );
};

export default NotificationList;
