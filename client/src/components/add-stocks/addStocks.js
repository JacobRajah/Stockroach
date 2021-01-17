import React, {Component} from 'react'
// import './main.css';
import NavBar from '../templates/navbar';

class AddStocks extends Component { 

    render() {
        return(
            <div>
                <NavBar></NavBar>
                <h1>Here we will be able to add stocks to portfolio</h1>
            </div>
        )
    }
}

export default AddStocks;