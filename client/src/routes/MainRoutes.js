import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Loadable from '../ui-component/Loadable';

const Jobs = Loadable(lazy(() => import('../views/main/jobs')));
const JobPosting = Loadable(lazy(() => import('../views/main/job-posting')));
const SavedJobs = Loadable(lazy(() => import('../views/main/saved-jobs')));
const About = Loadable(lazy(() => import('../views/about')));
const NotFound = Loadable(lazy(() => import('../views/error')));

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = ({ headerSearchText, sidebarFilters }) => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/jobs',
                '/savedjobs',
                '/about',
            ]}
        >
                <Switch location={location} key={location.pathname}>                    
                        <Route exact path="/jobs" component={Jobs} />
                        <Route path="/jobs/:slug" component={JobPosting} />
                        <Route path='/savedjobs' component={SavedJobs} headerSearchText={headerSearchText} sidebarFilters={sidebarFilters} />
                        <Route path="/about" component={About} />
                        <Route component={NotFound} />
                </Switch>
        </Route>
    );
};

export default MainRoutes;
