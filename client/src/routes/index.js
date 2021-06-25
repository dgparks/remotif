import debounce from 'lodash.debounce';
import React, { lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loadable from '../ui-component/Loadable';
import config from './../config';
import MainLayout from './../layout';
import MainRoutes from './MainRoutes';

const Jobs = Loadable(lazy(() => import('../views/main/jobs')));

//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {

    const [searchText, setSearchText] = React.useState('');
    const [filters, setFilters] = React.useState('');
    const [reload, setReload] = React.useState(false);

    const debouncedSearch = React.useCallback(
        debounce(_searchText => setSearchText(_searchText), 100),
        [],
    );

    const handleSearchText = (_searchText) => {
        if (_searchText.length !== 1) {
            debouncedSearch(_searchText);
        }  
    };

    const handleFilters = (items) => {
        let filters = ''
        items.forEach(item => {
            const attribute = item.attribute;
            const refinement = item.currentRefinement;
            if (typeof refinement === 'object') {
                const refinements = refinement.map(item => attribute + ':"' + item + '" OR ')
                filters += '(' + refinements.join('').slice(0, -4) + ') AND '
            } else {
                filters += '(' + attribute + ':' + refinement + ') AND '
            }
            
        })
        // delete trailing ') AND ' from the string, and if expired is checked,
        // it returns true (because checked), but when checked we want to filter out expired jobs
        // so that means we want the expired attribute on the job itself to be false
        filters = filters.slice(0, -5).replace('expired:true', 'expired:false')
        setFilters(filters);
        return []
    }

    const handleReload = () => {
        setReload(!reload)
    }
    
    return (
        <MainLayout searchText={searchText} filters={filters} handleSearchText={handleSearchText} handleFilters={handleFilters} handleReload={handleReload} >
            <Switch>
                <Route exact path="/jobs" render={(props) => ( <Jobs {...props} headerSearchText={searchText} sidebarFilters={filters} handleReload={handleReload} /> )} />
                <Redirect exact from="/" to={config.defaultPath} />
                <React.Fragment>
                    <MainRoutes headerSearchText={searchText} sidebarFilters={filters} />
                </React.Fragment>
            </Switch>
        </MainLayout>
    );
};

export default Routes;
