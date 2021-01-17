import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import NavBar from '../templates/navbar';
import Graph from '../graphing/graph';
import './searchPage.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const rows = [
  {
      stat: 'open',
      value: 15,
  },
  {
      stat: 'close',
      value: 25,
  },
  {
    stat: 'high',
    value: 95,
  },
  {
    stat: 'low',
    value: 15,
  },
  {
      stat: 'volume',
      value: 350000,
  }
]

function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Statistic</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.stat}>
              <TableCell component="th" scope="row">
                {row.stat}
              </TableCell>
              <TableCell>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// separator

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  table: {
    minWidth: 250,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const values = [
  { metric: 'ema_50'},
  { metric: 'ema_250'},
  { metric: 'mom_50'},
  { metric: 'mom_250'},
  { metric: 'rsi_50'},
  { metric: "rsi_250"},
  { metric: "open"},
  { metric: "high"},
  { metric: "low"},
  { metric: "close"},
  { metric: "volume"}
];

// search bar
function ComboBox() {

  return (
    <Autocomplete
      id="combo-box-demo"
      options={values}
      getOptionLabel={(option) => option.metric}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
    />
  );
}

export default function SearchPage() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <NavBar></NavBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg"  className={classes.container} height="100%">
          <Grid container spacing={3} justify = "center" alignItems="stretch" direction="row">
            {/* search bar 1 */}
            <Grid item xs={3.5}>
              <Paper className={classes.paper}>
                <ComboBox/>
              </Paper>
            </Grid>
            {/* search bar 2 */}
            <Grid item xs={3.5}>
              <Paper className={classes.paper}>
                <ComboBox/>
              </Paper>
            </Grid>
            {/* Graph */}
              <Grid item xs={12} md={8} lg={8}  alignItems="stretch">
                <Paper className={fixedHeightPaper}>
                  {/* {`Cell ${1}`} */}
                  {/* <div className="section"> */}

                    <Graph legendPosition="bottom" displayTitle={true} displayLegend = {false} metric1 = "ema_50" metric2 = "ema_250"/>    
                  {/* </div> */}
                </Paper>
              </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                <BasicTable/>
              </Paper>
            </Grid>
          </Grid>
          <div className = "searchHeader">
            {/* <Box pt={4}>
              <ComboBox/>
            </Box> */}
          </div>
        </Container>
      </main>
    </div>
  );
}