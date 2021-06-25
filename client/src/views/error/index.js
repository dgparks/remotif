import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import { gridSpacing } from '../../store/constant';
import imageBackground from './../../assets/images/maintenance/img-error-bg.svg';
import imageBlue from './../../assets/images/maintenance/img-error-blue.svg';
import imagePurple from './../../assets/images/maintenance/img-error-purple.svg';
import imageText from './../../assets/images/maintenance/img-error-text.svg';

// style constant
const useStyles = makeStyles(() => ({
    errorImg: {
        maxWidth: '600px',
        margin: '0 auto',
        position: 'relative'
    },
    errorContent: {
        maxWidth: '350px',
        margin: '0 auto',
        textAlign: 'center'
    },
    errorBlock: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgBlock: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        animation: '3s bounce ease-in-out infinite'
    },
    imgBackground: {
        animation: '10s blink ease-in-out infinite'
    },
    imgBlue: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        animation: '15s wings ease-in-out infinite'
    },
    imgPurple: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        animation: '12s wings ease-in-out infinite'
    }
}));

//==============================|| ERROR PAGE ||==============================//

const Error = () => {
    const classes = useStyles();

    return (
        <Card className={classes.errorBlock}>
            <CardContent>
                <Grid container justifyContent="center" spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <div className={classes.errorImg}>
                            <CardMedia component="img" image={imageBackground} title="Slider5 image" className={classes.imgBackground} />
                            <CardMedia component="img" image={imageText} title="Slider5 image" className={classes.imgBlock} />
                            <CardMedia component="img" image={imageBlue} title="Slider5 image" className={classes.imgBlue} />
                            <CardMedia component="img" image={imagePurple} title="Slider5 image" className={classes.imgPurple} />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.errorContent}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Typography variant="h1" component="div">
                                        Something is wrong
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                        The page you are looking was moved, removed, renamed, or might never exist!{' '}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" size="large" color="primary" component={Link} to={config.defaultPath}>
                                        <HomeTwoToneIcon sx={{ fontSize: '1.3rem', mr: 0.75 }} /> Home
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Error;
