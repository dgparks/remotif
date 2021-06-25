
import { Checkbox } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ls from 'local-storage';
import React from 'react';


const styles = {
    root: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: { 
        margin: 'auto',
        color: '#ef9a9a',
        ['@media(hover)']: {
            "&:hover": {
                background: '#fbe9e7'
            }
        }
    },
}

const SaveJobCell = ({ data }) => {

    const [state, setState] = React.useState({
        savedJobs: ls.get('savedJobs') || []
    });

    const handleChange = (event) => {
        const _id = data._id.$oid;
        let currentSavedJobs = ls.get('savedJobs') ? ls.get('savedJobs') : [];
        if (event.target.checked) {
            let newSavedJobs = [_id, ...currentSavedJobs];
            setState({
                savedJobs: newSavedJobs,
            });
            ls.set('savedJobs', newSavedJobs);
        }
        else {
            let newSavedJobs = currentSavedJobs.filter(item => item !== _id)
            setState({
                savedJobs: newSavedJobs
            });
            ls.set('savedJobs', newSavedJobs);
        }
        
    };

    if (!data){
        return <div />
    }

    return (
        <div style={styles.root}>
            <React.Fragment>
                <Checkbox
                    checkedIcon={<FavoriteIcon style={styles.icon}/>}
                    icon={<FavoriteBorderIcon style={styles.icon}/>}
                    checked={state.savedJobs.includes(data._id.$oid) ? true : false}
                    onChange={handleChange}
                >
                </Checkbox>
            </React.Fragment>
        </div>
    )
}

export default SaveJobCell;