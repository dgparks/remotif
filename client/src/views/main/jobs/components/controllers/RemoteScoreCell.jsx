
import { LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';

const styles = {
    root: {
        position: 'relative',
        padding: '0 20px',
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    img: { 
        maxHeight: 24,
    },
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
    scoreContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    percent: {
        marginLeft: '6px'
    }
}

const RemoteScoreCell = ({ value }) => {

    const valueAsInt = parseInt(value);

    const BorderLinearProgress = withStyles((theme) => ({
        root: {
          height: 4,
          borderRadius: 5,
        },
        colorPrimary: {
            backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[700]
        },
        bar: {
          borderRadius: 5,
          backgroundColor: theme.palette.mode === 'light' ? '#673ab7' : '#1a90ff'
        },
      }))(LinearProgress);

    return (
        <div style={styles.root}>
            {
                <React.Fragment>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <BorderLinearProgress
                            variant="determinate"
                            value={valueAsInt}
                            sx={{ minWidth: '75px' }}
                        />
                        <div style={{marginLeft: '8px'}}>{value}%</div>
                    </div>             
                </React.Fragment>
            }
        </div>
    )
}

export default RemoteScoreCell;