import { Card, CardContent, Typography } from '@material-ui/core';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import { makeStyles } from '@material-ui/styles';
import { IconChevronRight } from '@tabler/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { gridSpacing } from './../store/constant';

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
        whiteSpace: 'nowrap'
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
    }
}));

//-----------------------|| BREADCRUMBS ||-----------------------//

const Breadcrumbs = ({ icon, icons, navigation, ...others }) => {
    const classes = useStyles();

    // item separator
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
                <MuiBreadcrumbs classes={{root: classes.breadcrumbs}} aria-label="breadcrumb" separator={separatorIcon}>
                    <Typography noWrap component={Link} to="/" color="inherit" variant="subtitle1" className={classes.link}>
                        {icons && <HomeTwoToneIcon className={classes.icon} />}
                        {icon && <HomeIcon className={classes.icon} style={{ marginRight: 0 }} />}
                        {!icon && 'Dashboard'}
                    </Typography>
                    {itemContent}
                </MuiBreadcrumbs>
            </CardContent>
        </Card>
    );
};

Breadcrumbs.propTypes = {
    icon: PropTypes.bool,
    icons: PropTypes.bool,
    navigation: PropTypes.string,
};

export default Breadcrumbs;
