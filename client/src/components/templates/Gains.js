import React from 'react';
// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Gains</Title>
      <Typography component="p" variant="h4">
        $467.50
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 17 January, 2020
      </Typography>
      <div>
        <Link color="primary" to='./reports'>
          View report
        </Link>
      </div>
    </React.Fragment>
  );
}