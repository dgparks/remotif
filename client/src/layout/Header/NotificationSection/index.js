import {
    Box,
    Button,
    CardActions,
    CardContent,
    ClickAwayListener,
    Divider,
    Fade,
    Grid,
    IconButton,
    Paper,
    Popper,
    Stack,
    Typography,
    useMediaQuery
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles, useTheme } from '@material-ui/styles';
import ls from 'local-storage';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useHistory } from 'react-router-dom';
import MainCard from '../../../ui-component/MainCard';
import NotificationList from './NotificationList';

// style constant
const useStyles = makeStyles((theme) => ({
    ScrollHeight: {
        height: '100%',
        maxHeight: 'calc(100vh - 205px)',
        overflowX: 'hidden'
    },
    headerAvatar: {
        borderRadius: '27px',
        height: '48px',
        transition: 'all .2s ease-in-out',
        background: theme.palette.mode === 'dark' ? '' : theme.palette.background.default,
        color: theme.palette.mode === 'dark' ? theme.palette.error.light : theme.palette.error.light,
        ['@media(hover)']: {
            '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.orange.light,
            }
        }
    },
    cardContent: {
        padding: '0px !important',
        width: '330px',
        [theme.breakpoints.down('sm')]: {
            width: '300px',
        }
    },
    notificationChip: {
        borderRadius: '50%',
        color: theme.palette.background.default,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.error.light : theme.palette.error.light
    },
    divider: {
        marginTop: 0,
        marginBottom: 0
    },
    cardAction: {
        padding: '10px',
        justifyContent: 'center'
    },
    paddingBottom: {
        paddingBottom: '16px'
    },
    box: {
        marginLeft: '16px',
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '16px'
        }
    },
    bodyPPacing: {
        padding: '16px 16px 0'
    },
    textBoxSpacing: {
        padding: '0px 16px'
    }
}));

//-----------------------|| NOTIFICATION ||-----------------------//

const NotificationSection = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('sm'));
    const showingColor = theme.palette.mode === 'light' ? theme.palette.grey[500] : '#78909c';

    const [state, setState] = React.useState({
        savedJobs: ls.get('savedJobs') || [],
        numSavedJobs: ls.get('savedJobs') === null ? 0 : ls.get('savedJobs').length
    });

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
        setState({numSavedJobs: ls.get('savedJobs') === null ? 0 : ls.get('savedJobs').length});
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const history = useHistory();
    const HandleViewAll = (path) => {
        history.push({
            pathname: path
        })
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Box component="span" className={classes.box}>
                <IconButton
                    className={classes.headerAvatar}
                    variant="fill"
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    ref={anchorRef}
                    onClick={handleToggle}
                    title='Saved Jobs'
                >
                    {<FavoriteIcon stroke={1.5} size="1.5rem" />}
                </IconButton>
            </Box>
            <Popper
                autoFocus
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: matchesXs ? [-60, 20] : [0, 20]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <CardContent className={classes.cardContent}>
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item xs={12}>
                                                <div className={classes.bodyPPacing}>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item>
                                                            <Stack direction="row" spacing={1}>
                                                                <Typography variant="subtitle1">{state.numSavedJobs} Saved Jobs</Typography>
                                                                <Typography variant="subtitle1" style={{color: showingColor}}>({state.numSavedJobs < 5 ? state.numSavedJobs : 5} Showing)</Typography>
                                                                
                                                            </Stack>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <PerfectScrollbar className={classes.ScrollHeight}>
                                                    <Grid container direction="column">
                                                        <Grid item xs={12} p={0}>
                                                            <Divider className={classes.divider} />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <NotificationList handleClose={handleClose} />
                                                        </Grid>
                                                    </Grid>
                                                </PerfectScrollbar>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <Divider />
                                    <CardActions className={classes.cardAction}>
                                        <Button size="small" color="primary" disableElevation onClick={() => HandleViewAll('/savedjobs')}>
                                            View All
                                        </Button>
                                    </CardActions>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </React.Fragment>
    );
};

export default NotificationSection;
