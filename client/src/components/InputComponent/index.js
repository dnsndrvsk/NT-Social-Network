import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


class InputComponent extends Component {
  constructor(props) {
    super(props)
    
    this.state = { inputValue: '' }
  }
  
  onSubmit = () => {
    this.props.onSubmit(this.state.inputValue)
    this.setState({ inputValue: '' })
  }
  
  onInputChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }
  
  render() {
    return (
      <div>
        <TextField 
          hintText={this.props.hintText || "Type here..."}
          underlineShow={false}
          fullWidth={true}
          onChange={this.onInputChange}
          value={this.state.inputValue}
        />
        <RaisedButton
          label={this.props.btnLabel || "Send"}
          secondary={true}
          fullWidth={true}
          onClick={this.onSubmit}
          disabled={this.state.inputValue ? false : true}
        />
      </div>
    )
  }
}

InputComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  hintText: PropTypes.string,
  btnLabel: PropTypes.string
}

export default InputComponent
