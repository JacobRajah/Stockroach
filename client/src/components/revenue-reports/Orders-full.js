import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../templates/Title';
import axios from 'axios';

function StockOrders(props) {
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
      axios.get('/transactions').then(res => {
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