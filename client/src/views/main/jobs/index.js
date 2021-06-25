import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import Breadcrumbs from '../../../ui-component/Breadcrumbs';
import JobsMobile from '../jobs-mobile';
import JobsTable from './components/table/JobsTable';

//==============================|| JOBS ||==============================//

const Jobs = ({ headerSearchText, sidebarFilters }) => {

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

    const mobile = useMediaQuery(theme => theme.breakpoints.down('lg'));
    let componentToLoad;
    if (!mobile) {
        componentToLoad = <JobsTable page={state.page} headerSearchText={headerSearchText} sidebarFilters={sidebarFilters} />
    } else {
        componentToLoad = <JobsMobile page={state.page} headerSearchText={headerSearchText} sidebarFilters={sidebarFilters} />
    }

    const navigation = (headerSearchText === '' && (!sidebarFilters || sidebarFilters.length < 16)) ? 'All Jobs' : 'Search Results'

    return (
        <div key="jobs">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Remotif</title>
                <link rel="canonical" href='https://remotif.io'/>
            </Helmet>
            <Breadcrumbs navigation={navigation} icon />
            {componentToLoad}
        </div>
    );
};

export default Jobs;
