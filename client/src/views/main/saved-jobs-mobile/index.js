import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ls from 'local-storage';
import React from 'react';
import MainCard from '../../../ui-component/MainCard';
import MobileFooter from '../jobs-mobile/components/MobileFooter';
import SavedJobList from './components/SavedJobList';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'calc(100vh - 130px)',
        overflowY: 'scroll',
        padding: '0px'
    },
    appBarBottom: {
        top: 'auto',
        bottom: 0,
        backgroundColor: theme.palette.background.default
    },
}));

//-----------------------|| USER LIST STYLE 2 ||-----------------------//

const SavedJobsMobile = (props) => {
    const classes = useStyles();
    const savedJobs = ls.get('savedJobs') || [];
    const theme = useTheme();
    const cardColor = theme.palette.mode === 'light' ? '#ede7f6' : '#1a223f'
    const savedJobsMobileRef = React.createRef();

    return (
        <MainCard ref={savedJobsMobileRef} className={classes.root} contentSX={{padding: '0px'}} sx={{ border: 'none', backgroundColor: cardColor }}>
            <SavedJobList page={props.page} />
            <AppBar position="fixed" className={classes.appBarBottom}>
                <Toolbar style={{paddingTop: '4px', paddingBottom: '4px'}}>
                    <MobileFooter numTotalHits={savedJobs.length} jobsmobileRef={savedJobsMobileRef} />
                </Toolbar>
            </AppBar>
        </MainCard>
    );
};

export default SavedJobsMobile;
