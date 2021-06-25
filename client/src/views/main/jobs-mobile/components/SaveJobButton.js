import { Checkbox, makeStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ls from 'local-storage';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    savebutton: {
        marginTop: '10px',
        height: '48px',
        width: '48px',
        transition: 'all .2s ease-in-out',
        background: theme.palette.mode === 'dark' ? '' : theme.palette.background.default,
        color: theme.palette.error.light + '!important',
        ['@media(hover)']: {
            '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.orange.light,
            },
        },
    },
}));

const SaveJobButton = ({ _id }) => {

    const classes = useStyles();

    const [state, setState] = React.useState({
        savedJobs: ls.get('savedJobs') || []
    });

    const handleChange = (event) => {
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

    return (
        <Checkbox
        className={classes.savebutton}
        checkedIcon={<FavoriteIcon color="inherit" />}
        icon={<FavoriteBorderIcon color="inherit" />}
        checked={state.savedJobs.includes(_id) ? true : false}
        onChange={handleChange}
            >
        </Checkbox>
    )
}

export default SaveJobButton;
