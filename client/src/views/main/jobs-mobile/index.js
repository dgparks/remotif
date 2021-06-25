import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import algoliasearch from 'algoliasearch';
import React from 'react';
import MainCard from '../../../ui-component/MainCard';
import JobList from './components/JobList';
import MobileFooter from './components/MobileFooter';

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
    appBarWidthBottom: {
        top: 'auto',
        bottom: 0,
        transition: theme.transitions.create('width'),
        backgroundColor: theme.palette.background.default
    },
    divider: {
        borderColor: theme.palette.mode === 'light' ? '#d1d3d7' : ''
    }
}));

//-----------------------|| USER LIST STYLE 2 ||-----------------------//

const JobsMobile = ({ headerSearchText, sidebarFilters, ...props }) => {

    const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_API_KEY);
    const index = searchClient.initIndex('jobs');
    index.setSettings({
        attributesToRetrieve: [
            'objectID'
        ],
        attributesToHighlight: []
    });

    const getHits = async ({pageNum}={}) => {
        const response = await (index.search(headerSearchText, {filters: sidebarFilters, page: pageNum, hitsPerPage: 20}));

        const hits = response.hits;
        const numHits = response.nbHits;
        const numPages = response.nbPages;

        const hit_ids = hits.map(hit => (hit.objectID));
        return {hit_ids: hit_ids, numTotalHits: numHits, numPages: numPages};
    }

    const [hitIds, setHitIds] = React.useState(null)
    const [numTotalHits, setNumTotalHits] = React.useState(0);
    const [numPages, setNumPages] = React.useState(0);

    React.useEffect(() => {
        getHits({ pageNum: 0 }).then(response => {
            setHitIds(response.hit_ids);
            setNumTotalHits(response.numTotalHits);
            setNumPages(response.numPages);
        })
    }, [headerSearchText, sidebarFilters])

    const classes = useStyles();
    const theme = useTheme();
    const cardColor = theme.palette.mode === 'light' ? '#ede7f6' : '#1a223f'

    const jobsmobileRef = React.createRef();

    if(!hitIds) {
        return <div />
    }

    return (
        <div>
        {/* <div><Typography noWrap style={{ marginLeft: '6px' }} align="left" variant="subtitle1">Search Results</Typography></div>
        <Divider className={classes.divider} style={{ margin: '6px', marginTop: '-2px' }} /> */}
        <MainCard className={classes.root} id="jobsmobile" ref={jobsmobileRef} contentSX={{padding: '0px'}} sx={{ border: 'none', backgroundColor: cardColor }}>
            <JobList hit_ids={hitIds} numTotalHits={numTotalHits} numPages={numPages} getHits={getHits} page={props.page} />
            <AppBar position="fixed" className={classes.appBarBottom}>
                <Toolbar style={{paddingTop: '4px', paddingBottom: '4px'}}>
                    <MobileFooter numTotalHits={numTotalHits} jobsmobileRef={jobsmobileRef} />
                </Toolbar>
            </AppBar>
        </MainCard>
        </div>
    );
};

export default JobsMobile;
