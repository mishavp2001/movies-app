import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import classNames from 'classnames';
import "react-table/react-table.css"
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Slider from '@material-ui/lab/Slider';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import "../css/gallery.css";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 700,
  },
  slider: {
   margin: "12px 10px 0px 0px",
   backgroundColor: "green"
 },
 textfield: {
   margin: '10px'
 },
 paper: {
   width: "100%"
 },
 button: {
   margin: '10px'
 },
 label: {
   padding: '3px',
   textAlign: 'left'

 },
 head: {
   padding: '10px',
   margin: '10px'
 },
 card: {
   minWidth: 275,
   backgroundColor: 'lightgrey',
   textAlign: 'left'
 },
 title: {
   fontWeight: 'bold',
   fontSize: '24px'
 },
 level: {
   backgroundColor: 'yellow',
   display: 'block',
   padding: '4px',
   margin: '5px',
   width: '300px'
 },
 expense: {
   backgroundColor: 'yellow',
   display: 'block',
   padding: '5px',
   margin: '5px',
   width: '200px'
 },
 demo: {
   backgroundColor: 'gainsboro'
 }
});

let id = 0;

// Component for gallery
class Insurance extends Component {
  static propTypes = {
      showModal: PropTypes.bool,
      sort: PropTypes.string,
      url: PropTypes.string,
      insuranceResp: PropTypes.array,
      sortBy: PropTypes.func,
      classes: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    const plan1 = {
      premium: 0,
      maxout: 0,
      deductable: 0

    };
    const plan2 = {
      premium: 0,
      maxout: 0,
      deductable: 0
  };

    this.state = {
      plan1,
      plan2,
      risk: 50,
      totalExpense: 0,
      doctor: 0,
      hospital: 0,
      medicine: 0,
      insuranceLevel: 'Bronze'
    }
  }

  handleRisk = (event, value) => {
      this.setState({risk: value});
  }

  handleChange = (event) => {
      const ammount = parseFloat(event.target.value) ? parseFloat(event.target.value) : 0;

      if(event.target.name) {
        this.setState({
          [[event.target.name]]: ammount
        });
      }
  };

  handlePlanChange = (event, val) => {
      const ammount = parseFloat(event.target.value) ? parseFloat(event.target.value) : 0;
      if(val === 1) {
        const plan1 = Object.assign({}, this.state.plan1, {[[event.target.name]]: ammount});

        this.setState({
          plan1
        });
      } else {
        const plan2 = Object.assign({}, this.state.plan2, {[[event.target.name]]: ammount});
        this.setState({
          plan2
        });
      }
  };

  handleSubmit = (event) => {

  };

  reset = (event) => {
      const plan1 = {
        premium: 0,
        maxout: 0,
        deductable: 0
      };
      const plan2 = {
        premium: 0,
        maxout: 0,
        deductable: 0,
    };

    this.setState({
        plan1,
        plan2,
        risk: 50,
        totalExpense: 0,
        doctor: 0,
        hospital: 0,
        medicine: 0,
        insuranceLevel: 'Bronze'
    });
  };

  render() {
    const {insurancesResp=[], sortBy, sortedBy, classes} = this.props;
    const { risk, medicine, doctor, hospital, plan1, plan2, insuranceLevel } = this.state;
    const deductableExpense = (medicine + doctor + hospital < plan1.deductable ) ? medicine + doctor + hospital : plan1.deductable;
    const totalExpense = parseFloat( plan1.premium ) * 12 + deductableExpense;
    const maxTotalExpense = parseFloat( plan1.premium ) * 12 + plan1.maxout;

    let id = 0;

    return(
      <Grid container className={classes.root} >
         <Grid item xs={12}>
           <Grid container className={classes.demo} justify="center" spacing={16}>
             <Grid key="2" item>
               <Paper className={classes.paper}>
                  <Typography
                     className={classNames(classes.head, classes.label)}
                     id="label">Insurance Plan  Details
                   </Typography>
                   <Divider />
                   <Typography
                       className={classes.label}
                       id="label">Plan 1</Typography>
                   <TextField
                      value={plan1.premium}
                      name="premium"
                      label="Monthly Premium"
                      className={classes.textfield}
                      onChange={(e)=> { this.handlePlanChange(e, 1)}}
                    />
                    <TextField
                       value={plan1.deductable}
                       name="deductable"
                       label="Deductable"
                       className={classes.textfield}
                       onChange={(e)=> { this.handlePlanChange(e, 1)}}
                     />
                     <TextField
                        value={plan1.maxout}
                        name="maxout"
                        label="Maximum out of packet"
                        className={classes.textfield}
                        onChange={(e)=> { this.handlePlanChange(e, 1)}}
                      />
                    <Divider />
                    <Typography
                        className={classes.label}
                        id="label">Plan 2</Typography>
                    <TextField
                       value={plan2.premium}
                       name="premium"
                       label="Monthly Premium"
                       className={classes.textfield}
                       onChange={(e)=> { this.handlePlanChange(e, 2)}}
                     />
                     <TextField
                        value={plan2.deductable}
                        name="deductable"
                        label="Deductable"
                        className={classes.textfield}
                        onChange={(e)=> { this.handlePlanChange(e, 2)}}
                      />
                      <TextField
                         value={plan2.maxout}
                         name="maxout"
                         label="Maximum out of packet"
                         className={classes.textfield}
                         onChange={(e)=> { this.handlePlanChange(e, 2)}}
                       />
                     <Divider />
                 <Typography
                    className={classNames(classes.head, classes.label)}
                    id="label">Enter last year or estimate dedactable medical expenses </Typography>
                    <Divider />
                     <TextField
                        value={medicine}
                        name="medicine"
                        label="Total Medicine"
                        className={classes.textfield}
                        onChange={this.handleChange}
                      />
                      <Divider />
                      <TextField
                        value={doctor}
                         name="doctor"
                         label="Total Doctor Visits"
                         className={classes.textfield}
                         onChange={this.handleChange}
                       />
                       <Divider  />
                       <TextField
                          value={hospital}
                          name="hospital"
                          label="Total Hospital"
                          className={classes.textfield}
                          onChange={this.handleChange}
                         />
                      <Divider />
                      <Slider
                          className={classes.slider}
                          value={risk}
                          min={0}
                          max={100}
                          step={10}
                          aria-labelledby="label"
                          onChange={this.handleRisk}
                        >
                        </Slider>
                        <Typography
                            className={classes.label}
                            id="label">Risk Level</Typography>
                        <Divider />
                    <Typography
                        className={classes.label}
                        id="label">Total Maximum: ${maxTotalExpense}</Typography>
                    <Typography
                        className={classes.label}
                        id="label">Total Estimated: ${totalExpense}</Typography>
                     <Divider />
                      <Button type="button"
                        variant="outlined"
                        color="secondary"
                        onClick={this.reset}
                        className={classes.button}
                      >
                        Clear Values
                      </Button>
               </Paper>
             </Grid>
               <Grid key="1" item>
                 <Paper className={classes.paper}>
                 <Card className={classes.card}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Your estimated monthly expenses
                        <Typography className={classes.expense} variant="h2" component="h2">
                          ${(totalExpense/12).toFixed()}
                        </Typography>
                        Your maximum monthly expenses
                        <Typography className={classes.expense} variant="h2" component="h2">
                          ${(maxTotalExpense/12).toFixed()}
                        </Typography>
                        with your prefered risk level {this.state.risk}% we recommend you to buy
                        <Typography className={classes.level} variant="h2" component="h2">
                          {insuranceLevel}
                        </Typography>
                        level insurance plan
                      </Typography>
                    </CardContent>
                    <CardActions>
                      Enter you
                      <TextField
                         label="Zip"
                         className={classes.textfield}
                         variant="filled"
                       />
                       <TextField
                          label="Age"
                          className={classes.textfield}
                          variant="filled"
                        />
                       and
                      <Button size="large">Get All Insurance Quotes</Button>
                    </CardActions>
                    </Card>
                    <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Insurance Provider</TableCell>
                        <TableCell align="right">Premium</TableCell>
                        <TableCell align="right">Deductable</TableCell>
                        <TableCell align="right">Doctors Visit</TableCell>
                        <TableCell align="right">Specilist Visit</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {insurancesResp.map(row => (
                        <TableRow key={id++}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.premium}</TableCell>
                          <TableCell align="right">{row.deductable}</TableCell>
                          <TableCell align="right">{row.doctor_visit}</TableCell>
                          <TableCell align="right">{row.specialist_visit}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                 </Paper>
               </Grid>
           </Grid>
         </Grid>
      </Grid>
    )
  }
}

Insurance.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Insurance);
