import logo from './logo.svg';
import './App.css';
import Packages from './components/package'
import React,{useState} from 'react';
import {
  Grid,
  TextField,
  Button,
  Checkbox,
  Typography,
  Box,
  FormGroup,FormControlLabel
} from '@material-ui/core';
import SubmitButton from './components/submit_button'
import {makeStyles} from '@material-ui/core/styles';

import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles({
  buttonStyle:props=>{
    return{
      
    }
  },
  packageStyle: {
    
  }
})

const packages =[
  {
    name: "W30",
    amount: "30",
    duration: "6HRS"
  },
  {
    name: "W40",
    amount: "40",
    duration: "9HRS"
  },
  {
    name: "W50",
    amount: "50",
    duration: "24HRS"
  },
  {
    name: "W100",
    amount: "100",
    duration: "3DAYS"
  },
  {
    name: "W200",
    amount: "200",
    duration: "6DAYS"
  },
  {
    name: "W300",
    amount: "300",
    duration: "9DAYS"
  },
  {
    name: "W500",
    amount: "500",
    duration: "21DAYS"
  },
  {
    name: "W1000",
    amount: "1000",
    duration: "1MONTH"
  }
]

function App(props) {

  const [checked, setChecked] = useState({
    checked: true
  });

const handleChange=()=>{
  setChecked(true);
}
const instructions = '1.Lipa Na MPesa Paybill No. ######\n2.Enter Account No. e.g W50\n3.Enter Amount.e.g 50\n4.Accept Terms, on Login page\n5.Enter the code received  on this Page\n6.Click Connect.\n\n Support Contact:0706229743'
const instr_list = instructions.split('\n')
console.log(instr_list)
 const classes = useStyles(props)
  return (
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Grid container spacing={3}>
        
          <Grid item xs ={6} className={classes.packageStyle}>
          <h2>PACKAGE AMT DURATION</h2>
          {
            packages.map(pack=>{
              return(
                <Packages{...pack}  />
              )
            })      
          }
          </Grid> 
          <Grid item xs ={4} border="3px">
            <Box justifyContent="center" border={1}>
              <h2>TOP-UP INSTRUCTIONS</h2>
              <Typography variant="body1" color="textPrimary" component="p">
                {instr_list.map(inst=>{
                  return (
                    <div>{inst}</div>
                  )
                })}
              </Typography>
              
              <FormGroup row>
              <Box justifyContent="center" border={1}>
                <Grid item xs = {1}/>
                <FormControlLabel
                  control={
                  <Checkbox
                    checked={checked.checkedB}
                    onChange={handleChange}
                    name="checkedB"
                    color="primary"
                  />
                  }
                  label="Agree"
                />
                <Grid item xs = {1}/>
                </Box>
                <Grid item xs = {1}/>
                <form>
                  <TextField id="standard-basic" label="Token Number" />
                </form>
                <SubmitButton/>
              </FormGroup>
            </Box>
          </Grid>
          <Grid item xs={2}>

          </Grid>
        </Grid>
    
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms and Conditions
        </a>
      </header>
    </div>
  );
}

export default App;
