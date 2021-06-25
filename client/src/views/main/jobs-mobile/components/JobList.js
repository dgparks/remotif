import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import jobs_unsorted from "../../../../assets/data/jobs_nodesc.json";
import JobCard from './JobCard';

//-----------------------|| JOB LIST ||-----------------------//

const JobList = ({ hit_ids, numTotalHits, getHits }) => {

    // return an array of every job that matches the search results AND sort it according to the ranking of the search results
    const filterSortJobs = (_hit_ids) => {
        return jobs_unsorted.filter(job => _hit_ids.includes(job._id.$oid)).sort((a, b) => _hit_ids.indexOf(a._id.$oid) - _hit_ids.indexOf(b._id.$oid))
    }

    const [jobs, setJobs] = React.useState(null);
    const [hasMoreJobs, setHasMoreJobs] = React.useState(true);
    const [nextPage, setNextPage] = React.useState(1);

    // the callback ensures that joblist is re-rendered whenever the hit_ids prop changes
    // due to a change in searchtext or filters
    React.useEffect(() => {
        setJobs(filterSortJobs(hit_ids))
    }, [hit_ids])

    const fetchMoreJobs = () => {
        if (jobs.length >= numTotalHits) {
            setHasMoreJobs(false);
            return;
        } else {
            getHits({ pageNum: nextPage })
                .then(response => filterSortJobs(response.hit_ids))
                .then(newJobs => setJobs(jobs.concat(newJobs)));
            setNextPage(nextPage + 1);
        }
    }

    if (jobs === null) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <InfiniteScroll
                dataLength={jobs.length}
                next={fetchMoreJobs}
                hasMore={hasMoreJobs}
                scrollThreshold={0.8}
                scrollableTarget="jobsmobile"
            >
                {jobs.map((job, index) => (
                    <JobCard job={job} index={index} key={index} returnToPage={'Jobs'} />
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default JobList;
