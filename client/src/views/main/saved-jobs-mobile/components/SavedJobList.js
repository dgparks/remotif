import ls from 'local-storage';
import React from 'react';
import jobs_unsorted from "../../../../assets/data/jobs_nodesc.json";
import JobCard from '../../jobs-mobile/components/JobCard';

//-----------------------|| JOB LIST ||-----------------------//

const SavedJobsList = () => {
    const savedJobsIds = ls.get('savedJobs') || [];
    const savedJobs = jobs_unsorted.filter(job => savedJobsIds.includes(job._id.$oid))
                                    .sort((a, b) => savedJobsIds.indexOf(a._id.$oid) - savedJobsIds.indexOf(b._id.$oid))

    if (savedJobs === null) {
        return <div>No Saved Jobs!</div>
    }

    return (
        <div>
            {savedJobs.map((job, index) => (
                <JobCard job={job} index={index} key={index} returnToPage={'SavedJobs'} />
            ))}
        </div>
    );
};

export default SavedJobsList;
