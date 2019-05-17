import React, { Component } from "react";
import Insurance from "./components/Insurance";
import ReactImage from "./react.png";
import socketIOClient from "socket.io-client";
import "./css/app.css";

const DEFAULT_SORT = "insuranceId";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { insurances: null, sortedBy: DEFAULT_SORT };
  }

  componentDidMount() {
    //API call
    this.getInsurance();
  }

  getInsurance() {
    const socket = socketIOClient('http://localhost:8080/');
    socket.on('connect', () => {
      //console.log("Socket Connected");
      socket.emit('insurance', "Load");
      socket.on("insurance", insurance => {
        //Time out to show asynchronious behavier
        setTimeout(() => { this.setState({ insurances: insurance })}, 40);
        //this.setState({ movies: movies });
      });
    });
    socket.on('disconnect', () => {
      socket.off("insurance")
      socket.removeAllListeners("insurance");
      //console.log("Socket Disconnected");
    });
  }

  sortBy = (sort, e) => {
    //Call back to set state to sorted movies by sort parameter
    e.preventDefault();
    e.stopPropagation();
    if(!sort){return false};
    const insuranceSorted = this.state.insurances.sort((a, b) => (a[sort] > b[sort]) ? 1 : ((b[sort] > a[sort]) ? -1 : 0))
    this.setState(
      {insurances: insuranceSorted, sortedBy: sort}
    )
  }

  render() {
    return (
      <div className="gallery-container">
        <h1>Health Insurance Cost Estimator</h1>
        {this.state.insurances ? (
          <Insurance insurancesResp={this.state.insurances} sortedBy={this.state.sortedBy} sortBy={this.sortBy}/>
        ) : (
          <h1>Loading.. please wait!</h1>
        )}
      </div>
    );
  }
}
