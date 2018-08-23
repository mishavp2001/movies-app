import React, { Component } from "react";
import Gallery from "./components/Gallery";
import ReactImage from "./react.png";
import socketIOClient from "socket.io-client";
import "./css/app.css";

const DEFAULT_SORT = "movieId";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: null, sortedBy: DEFAULT_SORT };
  }

  componentDidMount() {
    //API call
    this.getMovies();
  }

  getMovies() {
    const socket = socketIOClient('http://localhost:8080/');
    socket.on('connect', () => {
      //console.log("Socket Connected");
      socket.emit('movies', "Load");
      socket.on("movies", movies => {
        //Time out to show asynchronious behavier
        setTimeout(() => { this.setState({ movies: movies })}, 4000);
        //this.setState({ movies: movies });
      });
    });
    socket.on('disconnect', () => {
      socket.off("movies")
      socket.removeAllListeners("movies");
      //console.log("Socket Disconnected");
    });
  }

  sortBy = (sort, e) => {
    //Call back to set state to sorted movies by sort parameter
    e.preventDefault();
    e.stopPropagation();
    if(!sort){return false};
    const moviesSorted = this.state.movies.sort((a, b) => (a[sort] > b[sort]) ? 1 : ((b[sort] > a[sort]) ? -1 : 0))
    this.setState(
      {movies: moviesSorted, sortedBy: sort}
    )
  }

  render() {
    return (
      <div className="gallery-container">
        <h1>Welcome to our gallery!</h1>
        {this.state.movies ? (
          <Gallery moviesResp={this.state.movies} sortedBy={this.state.sortedBy} sortBy={this.sortBy}/>
        ) : (
          <h1>Loading.. please wait!</h1>
        )}
      </div>
    );
  }
}
