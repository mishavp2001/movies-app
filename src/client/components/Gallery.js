import React, { Component } from "react";
import PropTypes from "prop-types";
import "../css/gallery.css";

const data = [{
name: 'Tanner Linsley',
age: 26,
friend: {
  name: 'Jason Maurer',
  age: 23
}
},{
name: 'Test',
age: 21,
friend: {
name: 'Jason Maurer',
age: 23
}}];

const columns = [{
Header: 'Name',
accessor: 'name' // String-based value accessors!
}, {
Header: 'Age',
accessor: 'age',
Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
}, {
id: 'friendName', // Required because our accessor is not a string
Header: 'Friend Name',
accessor: d => d.friend.name // Custom value accessors!
}, {
Header: props => <span>Friend Age</span>, // Custom header components!
accessor: 'friend.age'
}];

// Component for gallery
export default class Gallery extends Component{
  static propTypes = {
      showModal: PropTypes.bool,
      sort: PropTypes.string,
      url: PropTypes.string,
      moviesResp: PropTypes.array,
      sortBy: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
        showModal: false,
        url: '',
        sort: 'movieId'
    }
  }

  render() {
    const {moviesResp=[], sortBy, sortedBy} = this.props;
    return(
      <div className='container-fluid gallery-container'>
        <span>Sort:</span>
        <span className={`sortLink ${(sortedBy==='movieId') ? 'selected':''}`} onClick={(e) => sortBy('movieId', e)} >Movie ID</span>
        <span className= {`sortLink ${(sortedBy==='languageCode') ? 'selected':''}`} onClick={(e) => sortBy('languageCode', e)} >Language</span>

        <div className='row'>
          {
            moviesResp.map((movie, index) => {
               const {thumbnailUrl, fullSizeImageUrl, movieId} = movie;
               return <div key={movieId + "-" + index}  className='col-sm-6 col-md-3 col-xl-2'>
                  <div className='gallery-card' onClick={(e) => this.openModal(movie, e)}>
                    <GalleryImage className='gallery-thumbnail' src={thumbnailUrl} alt={'Image number ' + (index + 1)} />
                    <span className='card-icon-open fa fa-expand' value={fullSizeImageUrl} onClick={(e) => this.openModal(movie, e)}></span>
                  </div>
                </div>
             })
           }
        </div>

        <GalleryModal details={this.state.details} isopen={this.state.showModal} onClick={this.closeModal} />
      </div>
    )
  }

  // Function for opening modal dialog
  openModal = (movie, e) => {
     this.setState({
       showModal: true,
       details: movie
     })
   };

  // Function for closing modal dialog
  closeModal = () => {
    this.setState({
      showModal: false,
      details: ''
    })
  }
}

// Component for gallery image
class GalleryImage extends Component {
  render() {
    return(
      <img className={this.props.className} src={this.props.src} alt={this.props.alt} />
    )
  }
}

// Component for gallery modal
class GalleryModal extends Component {
  render() {
    if (this.props.isopen === false) {
      return null;
    }
    const {movieId, fullSizeImageUrl, movieName, languageCode, imageType} = this.props.details;

    return(
      <div className='modal-overlay' onClick={this.props.onClick} name={this.props.name}>
        <div className='modal-body'>
          <a className='modal-close' href='#' onClick={this.props.onClick}><span className='fa fa-times'></span></a>
          <img src={fullSizeImageUrl} />
          <span className='tags'> {movieName} - {languageCode} - {imageType} - {movieId}</span>
        </div>
      </div>
    )
  }
}
