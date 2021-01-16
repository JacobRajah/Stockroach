import React, {Component} from 'react'
import './graph.css';

class Graph extends Component { 

    constructor() {
        super()
        // Sample data
        this.data = [
            {
                date: '2021-01-14',
                ema_50: 25,
                ema_250: 26,
                mom_50: 50,
                mom_250: 75,
                rsi_50: 20,
                rsi_250: 40,
                open: 4235,
                high: 12,
                low: 235,
                close: 30,
                volume: 20
            },
            {
                date: '2021-01-15',
                ema_50: 25,
                ema_250: 26,
                mom_50: 50,
                mom_250: 75,
                rsi_50: 20,
                rsi_250: 40,
                open: 4235,
                high: 12,
                low: 235,
                close: 30,
                volume: 20
            },
            {
                date: '2021-01-16',
                ema_50: 25,
                ema_250: 26,
                mom_50: 50,
                mom_250: 75,
                rsi_50: 20,
                rsi_250: 40,
                open: 4235,
                high: 12,
                low: 235,
                close: 30,
                volume: 20
            }
        ]
    }

    render() {
        return(
            <div>
                <h1>Welcome to Stockroach</h1>
            </div>
        )
    }
}

export default Graph;