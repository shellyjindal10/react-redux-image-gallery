import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as GalleryActions from '../actions/actions'
import {bindActionCreators} from 'redux';


export class Gallery extends Component {
  componentDidMount() {
    this.props.loadImages();
  }

  render() {
    const {images, selectedImage, selectImage} = this.props;
    return (
      <div className="image-gallery">
        <div className="gallery-image">
          <div>
            <img src={selectedImage}/>
          </div>
        </div>
        <div className="image-scroller">
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} onClick={() => selectImage(image)}/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(GalleryActions, dispatch);
}

function mapStateToProps(state){
  return {
    images: state.images,
    selectedImage: state.selectedImage
  }
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(Gallery)



