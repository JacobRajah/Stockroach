import React, {Component} from 'react'
import './customers.css';
import axios from 'axios'

class Customers extends Component {

    constructor() {
        super();
        this.state = {
            customers: []
        }
    }

    componentDidMount() {
        axios.get('/api/customers').then(resp => {
            this.setState({customers: resp.data});
        })
    }

    render() {
        return(
            <div>
                <h2>Customers</h2>
                <ul>{this.state.customers.map((e,i) => {
                    return (<li>{e.firstName} {e.lastName}</li>)
                })}</ul>
            </div>
        )
    }
}

export default Customers;