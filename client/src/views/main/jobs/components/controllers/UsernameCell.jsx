
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
        minHeight: 24,
        maxHeight: 24,
        minWidth: 24,
        maxWidth: 24,
        borderRadius: '9999px'
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
    }
}
const UsernameCell = ({ value, data }) => {

    return (
        <div style={styles.root}>
            <React.Fragment>
                <img style={styles.img} src={data.logo} alt="logo" />
                <span style={styles.text}>{value}</span>
            </React.Fragment>
        </div>
    )
}

export default UsernameCell;