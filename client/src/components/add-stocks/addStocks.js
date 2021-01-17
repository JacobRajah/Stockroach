import React, {Component} from 'react'
// import './main.css';
import NavBar from '../templates/navbar';
import { makeStyles } from '@material-ui/core/styles';
import { OutlinedInput } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

class AddStocks extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            username: "foobar",
            stock: "AMZN",
            shares: "shares",
            price_bought: "0",
            date_bought: "2020-01-16",
            application: "bank",
            transaction: "buy",
            current: 0,
        }
    }

    render() {
        return(
            <div>
                <NavBar></NavBar>
                <h1>Add your stock to your Portfolio</h1>
                <form action="/reports">
                    <TextField
                        id="username"
                        label="Username"
                        defaultValue="foobar"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />

                    <br/>
                    <br/>
                    
                    <TextField mx="1rem"
                        required
                        id="stock"
                        label="Stock Ticker"
                        defaultValue="AMZN"
                        variant="outlined"
                    />
                    
                    <TextField 
                        id="shares"
                        label="Shares"
                        type="number"
                        defaultValue={0}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        id="price_bought"
                        label="Buy Price"
                        defaultValue={0.01}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    
                    <br/>
                    <br/>

                    <TextField
                        id="application"
                        label="Application"
                        defaultValue="Bank"
                        variant="outlined"
                    />
                    <TextField
                        id="date_bought"
                        label="Date YYYY-MM-DD"
                        defaultValue="2020-01-16"
                        variant="outlined"
                    />

                    <br/>
                    <br/>
                    
                    <Button variant="contained" color="primary">
                        <input type="submit" value="Buy" />
                    </Button>
                </form>

            </div>
        )
    }
}

export default AddStocks;