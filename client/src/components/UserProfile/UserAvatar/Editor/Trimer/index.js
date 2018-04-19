import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import './Trimer.scss'


const imageStyle = {
  display: 'block',
  width: '100%'
}


class Trimer extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      //source image
      src: null,
      sWidth: null,
      sHeight: null,
      
      //trimed
      newImage: null,
      width: 120,
      height: 150,
      fromX: 150,
      fromY: 80,
      ratio: 2
    }
  }
  
  componentDidMount() {
    const image = new Image()
    image.src = this.props.image
    
    this.setState({
      src: image.src,
      sWidth: image.width,
      sHeight: image.height
    })
  }
  
  getImagePortion = (imgObj, newWidth, newHeight, startX, startY, ratio) => {
    var tnCanvas = document.createElement('canvas')
    var tnCanvasContext = tnCanvas.getContext('2d')
    tnCanvas.width = newWidth
    tnCanvas.height = newHeight
    
    /* use the sourceCanvas to duplicate the entire image. This step was crucial for iOS4 and under devices. Follow the link at the end of this post to see what happens when you don’t do this */
    var bufferCanvas = document.createElement('canvas')
    var bufferContext = bufferCanvas.getContext('2d')
    bufferCanvas.width = imgObj.width
    bufferCanvas.height = imgObj.height
    bufferContext.drawImage(imgObj, 0, 0)
    
    /* now we use the drawImage method to take the pixels from our bufferCanvas and draw them into our thumbnail canvas */
    tnCanvasContext.drawImage(bufferCanvas, startX,startY,newWidth * ratio, newHeight * ratio,0,0,newWidth,newHeight)
    return tnCanvas.toDataURL()
  }
  
  onPreloadComplete = () => {
    const imgObject = new Image(this.state.sWidth, this.state.sHeight)
    imgObject.setAttribute('crossOrigin', 'anonymous')
    imgObject.src = this.state.src
    
    var newImg = this.getImagePortion(imgObject, this.state.width, this.state.height, this.state.fromX, this.state.fromY, this.state.ratio)
    this.setState({
      newImage: newImg
    })
  }
  
  
  onLeft = () => {
    this.setState({ fromX: this.state.fromX - 1 })
    this.onPreloadComplete()
  }
  
  onRight = () => {
    this.setState({ fromX: this.state.fromX + 1 })
    this.onPreloadComplete()
  }
  
  onUp = () => {
    this.setState({ fromY: this.state.fromY - 1 })
    this.onPreloadComplete()
  }
  
  onDown = () => {
    this.setState({ fromY: this.state.fromY + 1 })
    this.onPreloadComplete()
  }
  
  onZoomIn = () => {
    this.setState({ ratio: this.state.ratio - 1 })
    this.onPreloadComplete()
  }
  
  onZoomOut = () => {
    this.setState({ ratio: this.state.ratio + 1 })
    this.onPreloadComplete()
  }
  
  
  render() {
    return (
      <div className="trimer row">
        <div className="col s6">
          <img src={this.state.src} alt="abc" style={imageStyle}/>
          <div className="trimer__btns-wrap clearfix">
            <RaisedButton label="left" onClick={this.onLeft}/>
            <RaisedButton label="right" onClick={this.onRight}/>
          </div>
          <div className="trimer__btns-wrap clearfix">
            <RaisedButton label="down" onClick={this.onDown}/>
            <RaisedButton label="up" onClick={this.onUp}/>
          </div>
          <div className="trimer__btns-wrap clearfix">
            <RaisedButton label="+" onClick={this.onZoomIn}/>
            <RaisedButton label="-" onClick={this.onZoomOut}/>
          </div>
        </div>
        <div className="col s6">
          <img
            src={this.state.newImage}
            alt="abc"
            style={imageStyle}
          />
        </div>
      </div>
    )
  }
}

export default Trimer













//
//onMouseDown={this.onClick}
//        onMouseUp={this.onRelease}
//        onMouseLeave={this.onRelease}
//        onMouseMove={this.onDrag}


//  onMouseMove = (e) => {
//    const imgObject = new Image(this.state.sWidth, this.state.sHeight)
//    imgObject.setAttribute('crossOrigin', 'anonymous')
//    imgObject.src = this.state.src
//
//    var fromX = e.pageX - e.target.getBoundingClientRect().left
//    var fromY = e.pageY - e.target.getBoundingClientRect().top
//
//    var newImg = this.getImagePortion(imgObject, 120, 150, fromX, fromY, 1)
//    this.setState({
//      newImage: newImg
//    })
//  }