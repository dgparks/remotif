import {
    Card,
    Grid,
    LinearProgress,
    makeStyles,
    Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { gridSpacing } from '../../../../store/constant';
import SaveJobButton from './SaveJobButton';

const useStyles = makeStyles((theme) => ({
    successBadge: {
        color: theme.palette.success.dark,
        width: '14px',
        height: '14px'
    },
    tableAvatar: {
        width: '60px',
        height: '60px'
    },
    btnTable: {
        borderRadius: '4px',
        paddingLeft: '4px',
        paddingRight: '4px',
        width: '100%',
        minWidth: '120px',
    },
    tableSubContent: {
        whiteSpace: 'break-spaces'
    },
    sidebyside: {
        width: 'calc((100vw - 64px) * 0.5)',
        padding: '8px',
    },
    titleCompanyContainer: {
        width: 'calc(100vw - 180px)',
    },
    jobCard: {
        marginBottom: '6px',
        padding: '16px',
    },
}));

//-----------------------|| JOB LIST ||-----------------------//

const JobCard = ({ job, ...props }) => {
    const classes = useStyles();

    const history = useHistory();
    const HandleOpen = (data) => {
        history.push({
            pathname: `/jobs/${data.slug}`,
            state: {
                _id: data._id.$oid,
                title: data.title,
                company: data.company,
                returnToPage: {
                    table: props.returnToPage,
                    pageNum: props.page
                }
            }
        })
    };

    const BorderLinearProgress = withStyles((theme) => ({
        root: {
            height: 4,
            borderRadius: 5,
        },
        colorPrimary: {
            backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[700]
        },
        bar: {
            borderRadius: 5,
            //   backgroundColor: '#1a90ff',
            backgroundColor: theme.palette.mode === 'light' ? '#673ab7' : '#1a90ff'
        },
    }))(LinearProgress);

    return (
        <React.Fragment>
            <Card className={classes.jobCard} variant="outline" onClick={() => HandleOpen(job)}>
                {/*
                //
                // lOGO + TITLE + COMPANY
                //
                // */}
                <Grid container style={{ marginBottom: '12px' }} spacing={2}>
                    <Grid item>
                        <img src={job.logo} className={classes.tableAvatar} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                        <Grid className={classes.titleCompanyContainer} container spacing={1}>
                            <Grid item xs={12}>
                                <Typography noWrap style={{ marginTop: '6px' }} align="left" variant="subtitle1">
                                    {job.title}{' '}
                                    {/* {job.badgeStatus === 'active' && <CheckCircleIcon className={classes.successBadge} />} */}
                                </Typography>
                                <Typography noWrap align="left" variant="subtitle2" className={classes.tableSubContent}>
                                    {job.company}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item onClick={(e) => e.stopPropagation()} style={{ padding: '0px', margin: '0px' }}>
                        <SaveJobButton _id={job._id.$oid} />
                    </Grid>
                </Grid>
                {/*
                //
                // JOB CATEGORY + INDUSTRY
                //
                // */}
                <Grid wrap="nowrap" container spacing={1}>
                    <Grid className={classes.sidebyside} item xs={12}>
                        <Typography variant="caption">Category</Typography>
                        <Typography noWrap variant="h6">{job.category}</Typography>
                    </Grid>
                    <Grid className={classes.sidebyside} item xs={12}>
                        <Typography variant="caption">Industry</Typography>
                        <Typography noWrap variant="h6">{job.industry}</Typography>
                    </Grid>
                </Grid>
                <Grid wrap="nowrap" container spacing={1}>
                    <Grid className={classes.sidebyside} item xs={12}>
                        <Typography variant="caption">Location</Typography>
                        <Typography noWrap variant="h6">{job.location}</Typography>
                    </Grid>
                    <Grid className={classes.sidebyside} item xs={12}>
                        <Typography variant="caption">Tags</Typography>
                        <Typography style={{ wordWrap: 'break-word !important' }} variant="h6">
                            <span style={{color: 'red'}}>{job.expired !== false ? 'expired' : null}</span>
                            {job.expired !== false && job._tags.length > 0 ? ', ' : null }
                            {job._tags.join(', ')}
                        </Typography>
                    </Grid>
                </Grid>
                {/*
                //
                // REMOTE RATIO + DATE POSTEED
                //
                // */}
                <Grid wrap="nowrap" container spacing={1}>
                    <Grid style={{ marginTop: '-6px' }} justify="center" item xs={12}>
                        <Grid container justify="center" alignItems="center" spacing={gridSpacing}>
                            <Grid item>
                                <Typography variant="caption">Remote Score</Typography>
                                <BorderLinearProgress
                                    variant="determinate"
                                    value={job.remote_score}
                                    sx={{ minWidth: '75px', marginTop: '6px' }}
                                />
                            </Grid>
                            <Grid style={{ marginLeft: '-16px', marginTop: '24px' }} item>
                                <Typography variant="h6" component="div"> {job.remote_score}% </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid className={classes.sidebyside} item xs={12}>
                        <Typography variant="caption">Dated Posted</Typography>
                        <Typography variant="h6">{job.date_posted}</Typography>
                    </Grid>
                </Grid>
                <Grid style={{ float: 'right' }}>
                    <div id={`index-${props.index + 1}`}><Typography variant="caption">#{props.index + 1}</Typography></div>
                </Grid>

                {/*
                //
                // SAVE + VIEW BUTTONS
                //
                // */}
                {/* <Grid justify="center" container spacing={3}>
                    <Grid item xs={12} container spacing={1}>

                        <Grid item xs={6}>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                className={classes.btnTable}
                                endIcon={<ArrowForwardIcon />}
                                onClick={() => HandleOpen(job)}
                            >
                                View Job
                            </Button>
                        </Grid>
                    </Grid>
                </Grid> */}
            </Card>
        </React.Fragment>
    );
};

export default JobCard;
