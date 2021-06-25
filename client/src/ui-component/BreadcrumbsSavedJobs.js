import { Button, Card, CardContent, Typography } from '@material-ui/core';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import { makeStyles, useTheme } from '@material-ui/styles';
import { IconChevronRight, IconDownload } from '@tabler/icons';
import ls from 'local-storage';
import PropTypes from 'prop-types';
import React from 'react';
import { CSVLink } from "react-csv";
import { Link } from 'react-router-dom';
import jobs_unsorted from "../assets/data/jobs_nodesc.json";
import { gridSpacing } from '../store/constant';

// style constant
const useStyles = makeStyles((theme) => ({
    link: {
        display: 'flex',
        color: theme.palette.grey[900],
        textDecoration: 'none',
        alignContent: 'center',
        alignItems: 'center'
    },
    activeLink: {
        display: 'flex',
        textDecoration: 'none',
        alignContent: 'center',
        alignItems: 'center',
        color: theme.palette.grey[500]
    },
    icon: {
        marginRight: theme.spacing(0.75),
        marginTop: '-' + theme.spacing(0.25),
        width: '1rem',
        height: '1rem',
        color: theme.palette.mode === 'light' ? theme.palette.secondary.main : theme.palette.primary.main
    },
    content: {
        maxHeight: '36px',
        padding: '6px 16px 6px 16px !important',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    },
    noPadding: {
        padding: '16px !important',
        paddingLeft: '0 !important'
    },
    card: {
        marginBottom: '6px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center'
    },
    root: {
        background: 'transparent',
        boxShadow: 'none',
        border: 'none'
    },
    titleTop: {
        marginBottom: theme.spacing(1)
    },
    titleBottom: {
        marginTop: theme.spacing(1)
    },
    divider: {
        borderColor: theme.palette.primary.main,
        marginBottom: theme.spacing(gridSpacing)
    },
    breadcrumbs: {
        maxHeight: '24px',
        width: 'calc(100vw - 66px)',
        whiteSpace: 'nowrap !important',
        overflow: 'hidden !important',
        textOverflow: 'ellipsis !important'
    },
    nowrap: {
        maxHeight: '24px',
        width: 'calc(100vw - 114px) !important',
        whiteSpace: 'nowrap !important',
        overflow: 'hidden !important',
        textOverflow: 'ellipsis !important'
    },
    exportButton: {
        height: '28px',
        boxShadow: 'none',
        marginRight: '4px',
        borderRadius: '12px',
        backgroundColor: theme.palette.mode === 'light' ? "#f5f5fa" : "#1a223f",
        color: theme.palette.mode === 'light' ? "#673ab7" : "#2196f3",
        ['@media(hover)']: {
            '&:hover': {
                backgroundColor: theme.palette.mode === 'light' ? "#ede7f6" : "#29304a",
            }
        },
    }
}));

//-----------------------|| BREADCRUMBS ||-----------------------//

const BreadcrumbsSavedJobs = ({ icon, icons, navigation, ...others }) => {
    const classes = useStyles();
    const theme = useTheme();

    const savedJobsIds = ls.get('savedJobs') || [];
    const savedJobs = jobs_unsorted.filter(job => savedJobsIds.includes(job._id.$oid))
                                    .sort((a, b) => savedJobsIds.indexOf(a._id.$oid) - savedJobsIds.indexOf(b._id.$oid))

    const headers = [
        { label: "Company Name", key: "company" },
        { label: "Position Title", key: "title" },
        { label: "Job Category", key: "category" },
        { label: "Industry", key: "industry" },
        { label: "URL", key: "apply_url" },
    ];

    const separatorIcon = <IconChevronRight stroke={1.5} size="1rem" />;

    let itemContent;

    itemContent = (
        <div className={classes.nowrap}>
            <Typography noWrap variant="subtitle1" className={classes.activeLink}>
                {navigation}
            </Typography>
        </div>
    )

    return (
        <Card className={classes.card} {...others}>
            <CardContent className={classes.content}>
                <MuiBreadcrumbs classes={{ root: classes.breadcrumbs }} aria-label="breadcrumb" separator={separatorIcon}>
                    <Typography noWrap component={Link} to="/" color="inherit" variant="subtitle1" className={classes.link}>
                        {icons && <HomeTwoToneIcon className={classes.icon} />}
                        {icon && <HomeIcon className={classes.icon} style={{ marginRight: 0 }} />}
                        {!icon && 'Dashboard'}
                    </Typography>
                    {itemContent}
                </MuiBreadcrumbs>
            </CardContent>
            {savedJobs.length > 0 ?
                <CSVLink data={savedJobs} headers={headers} filename="remotif-savedjobs.csv" style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        className={classes.exportButton}
                        color={theme.palette.mode === 'light' ? "secondary" : "primary"}
                        style={{ height: '28px', boxShadow: 'none', marginRight: '4px', borderRadius: '12px' }}
                    >
                        Export CSV <IconDownload size="1.2rem" style={{ marginLeft: '4px' }} />
                    </Button>
                </CSVLink>
                :
                <Button
                    variant="disabled"
                >
                    Export CSV <IconDownload size="1.2rem" style={{ marginLeft: '4px' }} />
                </Button>
            }
        </Card>
    );
};

BreadcrumbsSavedJobs.propTypes = {
    icon: PropTypes.bool,
    icons: PropTypes.bool,
    navigation: PropTypes.string,
};

export default BreadcrumbsSavedJobs;
