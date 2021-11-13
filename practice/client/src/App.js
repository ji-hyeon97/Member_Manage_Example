import React, { Component } from 'react';
import Customer from './components/Customer'
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import  CircularProgress  from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class App extends Component {
  constructor(props) {
    super(props);    
    this.state = {//바꿀수 있다.
      customers: '',
      completed: 0
    }
    this.stateRefresh = this.stateRefresh.bind(this);    
  }
  stateRefresh() {
    this.setState({
      customers: '',
      completed: 0    
    });  
     
    this.callApi()    
    .then(res => this.setState({customers: res}))    
    .catch(err => console.log(err));
  } 

  componentDidMount() {// api 정보 불러옴
    this.timer = setInterval(this.progress,20);
    this.callApi()//받기
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json(); //데이터는 body에 json형태
    return body;//return
  }
  
  progress = () =>{
    const{completed} = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed +1});
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>idx</TableCell>
                <TableCell>user ID</TableCell>
                <TableCell>date</TableCell>
                <TableCell>wavelength</TableCell>
                <TableCell>laser_power</TableCell>
                <TableCell>swept_time</TableCell>
                <TableCell>cnt_cyto_control</TableCell>
                <TableCell>cnt_cyto_experi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? this.state.customers.map(c => {
                return <Customer key={c.id} id={c.id} userID={c.userID} date={c.date} wavelength={c.wavelength} laser_power={c.laser_power} swept_time={c.swept_time} cnt_cyto_control={c.cnt_cyto_control} cnt_cyto_experi={c.cnt_cyto_experi} />
              }) : 
              <TableRow>
                <TableCell colSpan="8" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                  </TableCell>
                  </TableRow>}
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
    );
  }
}

export default withStyles(styles)(App);