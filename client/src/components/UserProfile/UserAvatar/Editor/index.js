import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Trimer from './Trimer'
import './Editor.scss'

class Editor extends Component {
  constructor(props) {
    super(props)
    
    this.state = { open: false }
  }
  
  toggleForm = () => {
    this.setState({ open: !this.state.open })
  }
  
  trimImage = () => {}
  
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={this.toggleForm}
      />,
      <FlatButton
        label="Trim"
        primary={true}
        keyboardFocused={true}
        onClick={this.trimImage}
      />
    ]
    
    return (
      <div className="editor">
        <RaisedButton
          label="Edit"
          fullWidth={true}
          onClick={this.toggleForm}
        />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.toggleForm}
        >
          <div className="editor__image-wrap">
            <img
              className="editor__image"
              src={this.props.image}
              alt="blah blah"
            />
            <Trimer />
          </div>
        </Dialog>
      </div>
    )
  }
}

export default Editor
