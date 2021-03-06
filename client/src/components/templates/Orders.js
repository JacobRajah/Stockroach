import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

function StockOrders(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Bought ($)</TableCell>
            <TableCell>Date Bought</TableCell>
            <TableCell>Shares</TableCell>
            <TableCell>Application</TableCell>
            <TableCell align="right">Transaction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.stock}</TableCell>
              <TableCell>{row.price_bought}</TableCell>
              <TableCell>{row.date_bought}</TableCell>
              <TableCell>{row.shares}</TableCell>
              <TableCell>{row.application}</TableCell>
              <TableCell align="right">{row.transaction}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" to='./reports'>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}

class Orders extends Component {

    constructor() {
      super()
      this.state = {
        rows: []
      }
    }

    componentDidMount() {
      axios.get('/transactions/5').then(res => {
        this.setState({rows: res.data})
      })
    }
    render() {
      return(
        <div>
          <StockOrders rows={this.state.rows}></StockOrders>
        </div>
      )
    }
}

export default Orders