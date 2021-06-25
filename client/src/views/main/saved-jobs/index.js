import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ls from 'local-storage';
import React from 'react';
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import BreadcrumbsSavedJobs from '../../../ui-component/BreadcrumbsSavedJobs';
import SavedJobsMobile from '../saved-jobs-mobile';
import SavedJobsTable from './components/SavedJobsTable';

// style constant
const useStyles = makeStyles((theme) => ({
    blank: {
        display: 'flex',
        color: theme.palette.grey[900],
        textDecoration: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        width: '100%',
        height: 'calc(100vh - 220px)',
        fontWeight: '700',
        fontSize: '2rem',
        cursor: 'default',
    }
}));

//==============================|| SAMPLE PAGE ||==============================//

const SavedJobs = ({ headerSearchText, sidebarFilters }) => {

    const classes = useStyles();
    const theme = useTheme();

    let page;
    const location = useLocation();
    if (location.state && location.state.returnToPage) {
        page = location.state.returnToPage.pageNum;
    } else {
        page = 1;
    }
    const [state, setState] = React.useState({
        page: page,
    });

    const hasSavedJobs = (ls.get('savedJobs') || []).length > 0;
    const mobile = useMediaQuery(theme => theme.breakpoints.down('lg'));
    let componentToLoad;
    if (!hasSavedJobs) {
        componentToLoad = <div className={classes.blank} style={{color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.2)' : 'rgba(255,255,255,.3)'}}>No Saved Jobs</div>
    } else if (!mobile) {
        componentToLoad = <SavedJobsTable page={state.page} headerSearchText={headerSearchText} sidebarFilters={sidebarFilters} />
    } else {
        componentToLoad = <SavedJobsMobile page={state.page} headerSearchText={headerSearchText} sidebarFilters={sidebarFilters} />
    }

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Saved Jobs - Remotif</title>
                <link rel="canonical" href='https://remotif.io/savedjobs' />
            </Helmet>
            <BreadcrumbsSavedJobs navigation={'Saved Jobs'} icon />
            {componentToLoad}
        </div>
    );
};

export default SavedJobs;