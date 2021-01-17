import React, {Component} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import axios from 'axios';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

function HomeGraph(props) {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Title>{props.Title}</Title>
      <ResponsiveContainer>
        <LineChart
          data={props.data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} tick={{fontSize: 10}}/>
          <YAxis stroke={theme.palette.text.secondary} domain={['dataMin', 'dataMax']} tick={{fontSize: 10}}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Price ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

class Chart extends Component {

  constructor() {
    super();
    this.state = {
      data: [],
      Title: "Google",
      carousel: [
        ["Google", "googl"],
        ["Microsoft", "msft_real"],
        ["Nvidia", "nvda"],
        ["Amazon", "amzn"] 
      ],
      current: 0
    }
  }

  componentDidMount() {
    this.fetchStock();
    this.timer = setInterval(() => this.fetchStock(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  fetchStock() {
    var data = {stock: this.state.carousel[this.state.current][1]}
    axios.post('/stockReq/open', data).then(
      res => {
        res = res.data.map((e,i) => {
          return createData(e.time, e.value)
        })
        this.setState({data: res, Title: this.state.carousel[this.state.current][0]});
        const next_index = (this.state.current + 1) % this.state.carousel.length;
        this.setState({current: next_index});
      }
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.state.data !== [] ? <HomeGraph data={this.state.data}
                                             Title={this.state.Title}
                                             ></HomeGraph> : null}
      </React.Fragment>
    )
  }
}

export default Chart