import { Avatar, Badge, Box, ButtonBase, Card, CardContent, Fade, Grid, InputAdornment, OutlinedInput, Popper } from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { IconAdjustmentsHorizontal, IconCircleX, IconMenu2, IconSearch } from '@tabler/icons';
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';
import React from 'react';
import { useSelector } from 'react-redux';
import './search.css';

// style constant
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    searchControlMobile: {
        fontSize: '16px',
        width: '97%',
        marginLeft: '8px',
        paddingRight: '16px',
        paddingLeft: '12px',
        '& input': {
            background: 'transparent !important',
            paddingLeft: '0px !important'
        },
        [theme.breakpoints.down('lg')]: {
            width: '96%'
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
            background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : '#fff'
        }
    },
    searchControl: {
        fontSize: '16px',
        width: '97%',
        marginLeft: '16px',
        paddingRight: '16px',
        paddingLeft: '16px',
        '& input': {
            background: 'transparent !important',
            paddingLeft: '5px !important'
        },
        [theme.breakpoints.down('lg')]: {
            width: '96%'
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
            background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : '#fff'
        }
    },
    startAdornmentSearch: {
        fontSize: '1.5rem',
        color: theme.palette.grey[500],
    },
    startAdornmentClear: {
        fontSize: '1.5rem',
        cursor: 'pointer',
        color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary.main,
    },
    headerAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
        color: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.secondary.dark,
        ['@media(hover)']: {
            '&:hover': {
                background: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.secondary.dark,
                color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.secondary.light
            }
        }
    },
    closeAvatarMobile: {
        marginLeft: '-4px',
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
        color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary.main,
    },
    popperContainer: {
        zIndex: 1100,
        width: '99%',
        top: '-55px !important',
        padding: '0 12px',
        [theme.breakpoints.down('sm')]: {
            padding: '0 10px'
        }
    },
    cardContent: {
        padding: '12px !important',
        paddingLeft: '6px !important',
        paddingTop: '11px !important'
    },
    card: {
        background: theme.palette.mode === 'dark' ? theme.palette.dark[900] : '#fff',
        [theme.breakpoints.down('sm')]: {
            border: 0,
            boxShadow: 'none'
        }
    }
}));

const CustomizedBadge = withStyles((theme) => ({
    badge: {
        right: 4,
        top: 6,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px'
    }
}))(Badge);

//-----------------------|| SEARCH INPUT ||-----------------------//

const SearchSection = ({ filters, handleLeftDrawerToggle, handleSearchText }) => {
    const classes = useStyles();
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const [value, setValue] = React.useState('');

    let searchIcon;
    let endAdornment;
    if (value === '') {
        searchIcon = <ButtonBase sx={{ borderRadius: '12px' }}> <Avatar variant="rounded" className={classes.headerAvatar} > <IconSearch stroke={1.5} size="1.2rem" /> </Avatar> </ButtonBase>
        endAdornment = ''
    } else {
        const searchCount = value.split(' ').length
        searchIcon = <CustomizedBadge color={theme.palette.mode === 'light' ? 'secondary' : 'primary'} badgeContent={searchCount}><ButtonBase sx={{ borderRadius: '12px' }}> <Avatar variant="rounded" className={classes.headerAvatar} > <IconSearch stroke={1.5} size="1.2rem" /> </Avatar> </ButtonBase></CustomizedBadge>
        endAdornment = <InputAdornment position="end"> <IconCircleX stroke={1.5} size="1.5rem" className={classes.startAdornmentClear} onClick={() => { setValue(''); handleSearchText('') }} /> </InputAdornment>
    }

    let filterIcon;
    const categoryCount = (filters.match(/ AND /g) || []).length;
    const subCategoryCount = (filters.match(/ OR /g) || []).length;
    const filterCount = categoryCount + subCategoryCount;
    if (filterCount > 0) {
        filterIcon = <CustomizedBadge color={theme.palette.mode === 'light' ? 'secondary' : 'primary'} badgeContent={filterCount}><ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}> <Avatar variant="rounded" className={classes.headerAvatar} onClick={handleLeftDrawerToggle} title={customization.opened ? 'Hide Filters' : 'Show Filters'} color="inherit"> <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" /> </Avatar> </ButtonBase></CustomizedBadge>
    } else {
        filterIcon = <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}> <Avatar variant="rounded" className={classes.headerAvatar} onClick={handleLeftDrawerToggle} title={customization.opened ? 'Hide Filters' : 'Show Filters'} color="inherit"> <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" /> </Avatar> </ButtonBase>
    }

    return (
        <React.Fragment>
            <Box className={classes.grow} sx={{ display: { xs: 'block', md: 'none' } }}>
                <PopupState variant="popper" popupId="mobile-search">
                    {(popupState) => (
                        <React.Fragment>
                            <Box ml={2} {...bindToggle(popupState)}>
                                {searchIcon}
                            </Box>
                            <Popper {...bindPopper(popupState)} transition className={classes.popperContainer}>
                                {({ TransitionProps }) => (
                                    <Fade {...TransitionProps} timeout={350}>
                                        <Card className={classes.card}>
                                            <CardContent className={classes.cardContent}>
                                                <Grid container alignItems="center" justifyContent="flex-start">
                                                    <Grid item xs>
                                                        {filterIcon}
                                                    </Grid>
                                                    <Grid style={{ flexGrow: 1000, marginLeft: '4px' }} item xs>
                                                        <OutlinedInput
                                                            autoFocus
                                                            className={classes.searchControlMobile}
                                                            color={theme.palette.mode === 'light' ? 'secondary' : 'primary'}
                                                            id="input-search-header"
                                                            value={value}
                                                            onChange={(e) => { setValue(e.target.value); handleSearchText(e.target.value) }}
                                                            placeholder="Search jobs..."
                                                            endAdornment={endAdornment}
                                                            startAdornment={
                                                                <InputAdornment position="start">
                                                                    <Box>
                                                                        <ButtonBase sx={{ borderRadius: '12px' }}>
                                                                            <Avatar
                                                                                variant="rounded"
                                                                                className={classes.closeAvatarMobile}
                                                                                {...bindToggle(popupState)}
                                                                            >
                                                                                <IconMenu2 stroke={1.5} size="1.3rem" />
                                                                            </Avatar>
                                                                        </ButtonBase>
                                                                    </Box>
                                                                </InputAdornment>
                                                            }
                                                            aria-describedby="search-helper-text"
                                                            inputProps={{
                                                                'aria-label': 'weight'
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Fade>
                                )}
                            </Popper>
                        </React.Fragment>
                    )}
                </PopupState>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <OutlinedInput
                    autoFocus
                    className={classes.searchControl}
                    color={theme.palette.mode === 'light' ? 'secondary' : 'primary'}
                    id="input-search-header"
                    value={value}
                    onChange={(e) => { setValue(e.target.value); handleSearchText(e.target.value) }}
                    placeholder="Search jobs..."
                    endAdornment={endAdornment}
                    aria-describedby="search-helper-text"
                    inputProps={{
                        'aria-label': 'weight'
                    }}
                />
            </Box>
        </React.Fragment>
    );
};

export default SearchSection;
