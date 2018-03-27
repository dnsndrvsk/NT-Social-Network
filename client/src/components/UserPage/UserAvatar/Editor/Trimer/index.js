import React, { Component } from 'react'

class Trimer extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      width: 100,
      height: 200,
      x: 0,
      y: 0,
      mX: 0,
      mY: 0,
      dragging: false
    }
  }
  
  onClick = (e) => {
    this.setState({ dragging: true })
  }
  
  onRelease = (e) => {
    this.setState({ dragging: false })
  }
  
  onDrag = (e) => {
    if (false) {
      this.setState({
        x: e.pageX - e.target.getBoundingClientRect().x,
        y: e.pageY - e.target.getBoundingClientRect().y
      })
    }
  }
  
  render() {
    const styles = {
      width: this.state.width + 'px',
      height: this.state.height + 'px',
      left: this.state.x + 'px',
      top: this.state.y + 'px',
      background: 'rgba(255,255,255,.1)',
      position: 'absolute',
      zIndex: '1000',
      border: 'dashed 1px #fff',
      cursor: 'pointer'
    }
    
    return (
      <div
        style={styles}
        onMouseDown={this.onClick}
        onMouseUp={this.onRelease}
        onMouseLeave={this.onRelease}
        onMouseMove={this.onDrag}
      >
        
      </div>
    )
  }
}

export default Trimer
