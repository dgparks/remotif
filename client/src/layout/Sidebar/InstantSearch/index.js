import { Divider, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import algoliasearch from 'algoliasearch/lite';
import { orderBy } from 'lodash';
import React from 'react';
import { ClearRefinements, Configure, CurrentRefinements, InstantSearch, RefinementList, ToggleRefinement } from 'react-instantsearch-dom';
import './satellite-modified.css';

const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_API_KEY
);

// style constant
const useStyles = makeStyles((theme) => ({
    menuCaption: {
        ...theme.typography.menuCaption
    },
    subMenuCaption: {
        ...theme.typography.subMenuCaption
    },
    menuDivider: {
        marginTop: '10px',
    }
}));

const SearchFilters = ({ searchText, handleFilters }) => {

    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={theme.palette.mode === 'light' ? 'lightmode' : 'darkmode'}>
            <InstantSearch
                indexName="jobs"
                searchClient={searchClient}
            >
                <Configure query={searchText} />
                <Typography variant="caption" className={classes.menuCaption} display="block" gutterBottom>Job Category</Typography>
                <RefinementList attribute="category" limit={5} showMore transformItems={items => orderBy(items, "count", "desc")} />
                <Divider className={classes.menuDivider} />

                <Typography variant="caption" className={classes.menuCaption} display="block" gutterBottom>Company</Typography>
                <RefinementList attribute="company" limit={5} showMore transformItems={items => orderBy(items, "count", "desc")} />
                <Divider className={classes.menuDivider} />

                <Typography variant="caption" className={classes.menuCaption} display="block" gutterBottom>Industry</Typography>
                <RefinementList attribute="industry" limit={5} showMore transformItems={items => orderBy(items, "count", "desc")} />
                <Divider className={classes.menuDivider} />

                <ToggleRefinement attribute="expired" label="Hide Expired Jobs" value={false} defaultRefinement={true}/>

                <ClearRefinements
                    transformItems={items =>
                        items.filter(item => item.attribute !== 'expired')
                    }
                    translations={{ reset: 'Reset all filters' }}
                />

                <CurrentRefinements
                    transformItems={ items => handleFilters(items) }
                />

            </InstantSearch>
        </div>
    );
}

export default SearchFilters;