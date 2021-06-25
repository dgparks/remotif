
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
        padding: '0 20px',
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    img: { maxHeight: 24 },
    input: {
        position: 'absolute',
        height: 28,
        width: 'calc(100% - 82px)',
        top: 10,
        right: 20,
        bottom: 0,
        border: 'none',
        borderBottom: '1px solid #eee',
        outline: 'none',
        fontSize: 16,
        padding: 0,
        fontFamily: 'inherit'
    },
    text: {
        marginLeft: 10,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    tagsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '10px 0'
    },
    tag: {
        border: '1px solid lightblue',
        backgroundColor: 'white',
        color: '#4d4d4d',
        padding: '4px 8px 4px 8px',
        margin: '2px 1px',
        borderRadius: 12,
        maxHeight: 32,
        minWidth: 'max-content',
        boxShadow: 'none',
        fontWeight: '400',
        fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
        fontSize: 13,
    },
    tagDark: {
        border: '1px solid #105699',
        backgroundColor: '#212946',
        color: '#bdc8f0',
        padding: '4px 8px 4px 8px',
        margin: '2px 1px',
        borderRadius: 12,
        maxHeight: 32,
        minWidth: 'max-content',
        boxShadow: 'none',
        fontWeight: '400',
        fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
        fontSize: 13,
    },
    tagExpired: {
        border: '1px solid red',
        backgroundColor: 'white',
        color: '#4d4d4d',
        padding: '4px 8px 4px 8px',
        margin: '2px 2px',
        borderRadius: 12,
        maxHeight: 32,
        minWidth: 'max-content',
        boxShadow: 'none',
        fontWeight: '400',
        fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
        fontSize: 13,
    },
    tagExpiredDark: {
        border: '1px solid red',
        backgroundColor: '#212946',
        color: '#bdc8f0',
        padding: '4px 8px 4px 8px',
        margin: '2px 2px',
        borderRadius: 12,
        maxHeight: 32,
        minWidth: 'max-content',
        boxShadow: 'none',
        fontWeight: '400',
        fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
        fontSize: 13,
    }
}));

const TagsCell = ({ value, data }) => {

    const theme = useTheme();
    const classes = useStyles();

    value = value.split(',');

    let tags = [];
    if (data.expired !== false) {
        tags.push(<div className={theme.palette.mode === 'light' ? classes.tagExpired : classes.tagExpiredDark} key='expired'>expired</div>)
    }
    if(value[0] !== '') {
        tags.push(value.map(item => <div className={theme.palette.mode === 'light' ? classes.tag : classes.tagDark} key={item.toString()}>{item}</div>))
    }
    
    let tagsContainer;
    if(tags[0] !== '') {
        tagsContainer = <div className={classes.tagsContainer}>{tags}</div>
    } else {
        tagsContainer = <div></div>
    }
    

    return (
        <div className={classes.root}>
            {
                <React.Fragment>
                    {tagsContainer}
                </React.Fragment>
            }
        </div>
    )
}

export default TagsCell;