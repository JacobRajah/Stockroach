import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import './graph.css';

class Graph extends Component { 

    constructor(props) {
        super(props);

        // Sample data
        this.data = [
            {
                date: '2021-01-14',
                ema_50: 15,
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
                ema_50: 35,
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

        var datelabels = this.data.map(function(e) {
            return e.date;
        });
        var metric1 = this.data.map(function(e) {
            return e[props.metric1];
        });

        var metric2 = this.data.map(function(e) {
            return e[props.metric2];
        });

        this.state = {
            chartData:{
                labels: datelabels,
                datasets:[
                    {
                        label: 'Population',
                        data: metric1,
                        fill: false,
                        backgroundColor: [
                            'rgba(92, 103, 125, 0.6)',
                        ]
                    },

                    {
                        label: 'Stocks',
                        data: metric2,
                        fill: false,
                        backgroundColor: [
                            'rgba(92, 103, 125, 0.6)',
                        ]
                    }
                ]
            }
        }

    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right'
    }

    render() {
        return(
            <div className="graph">
                <Line
                data={this.state.chartData}
                // width={"50%"}
                // height={50}
                options={{ 
                    title:{
                        display: this.props.displayTitle,
                        text:'Largest Cities in Massachusetts',
                        fontSize: 17
                    },
                    legend:{
                        display: this.props.displayLegend,
                        position: this.props.legendPosition
                    },
                    maintainAspectRatio: false,
                    responsive: true,

                }}
                />            
            </div>
        )
    }
}

export default Graph;