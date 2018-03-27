import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import Slider from 'material-ui/Slider'
import SelectField from 'material-ui/SelectField'
import Checkbox from 'material-ui/Checkbox'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import './SearchFilter.scss'


class SearchFilter extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      origin: '',
      ageFrom: 0,
      ageTo: 150,
      online: false
    }
  }
  
  submitFilters = () => {
    const data = Object.assign({}, this.state)
    
    if (!data.origin) data.origin = ["Human", "Alien"]
    
    this.props.loadFilteredData(data)
  }
  
  handleAgeFromChange = (e, value) => {
    this.setState({ ageFrom: value })
  }
  
  handleAgeToChange = (e, value) => {
    this.setState({ ageTo: value })
  }
  
  onOriginChange = (event, index, value) => {
    this.setState({ origin: value })
  }
  
  onOnlineChange = () => {
    this.setState({ online: !this.state.online })
  }
  
  resetFilters = () => {
    this.setState({
      origin: '',
      ageFrom: 0,
      ageTo: 150,
      online: false
    })
  }
  
  render() {
    return (
      <div className="search-filter">
        <Paper zDepth={1}>
          <div className="search-filter__wrap-inner">
            <div className="search-filter__field">
              <div className="search-filter__field-header">Origin</div>
              <SelectField
                floatingLabelText="Origin"
                value={this.state.origin}
                onChange={this.onOriginChange}
                fullWidth={true}
              >
                <MenuItem value="Human" primaryText="Human" />
                <MenuItem value="Alien" primaryText="Alien" />
              </SelectField>
            </div>
            <div className="search-filter__field">
              <div className="search-filter__field-header">Age</div>
              <div>from {this.state.ageFrom} </div>
              <Slider
                min={0}
                max={this.state.ageTo}
                step={1}
                defaultValue={this.state.ageFrom}
                onChange={this.handleAgeFromChange}
              />
              <div>to {this.state.ageTo}</div>
              <Slider
                min={this.state.ageFrom}
                max={150}
                step={1}
                defaultValue={this.state.ageTo}
                onChange={this.handleAgeToChange}
              />
            </div>
            <div className="search-filter__field">
              <div className="search-filter__field-header">Additionally</div>
              <Checkbox
                label="Only online"
                checked={this.state.online}
                onCheck={this.onOnlineChange}
              />
            </div>
            <div className="search-filter__btns">
              <RaisedButton
                label="Filter"
                primary={true}
                fullWidth={true}
                onClick={this.submitFilters}
              />
              <RaisedButton
                label="Reset"
                secondary={true}
                fullWidth={true}
                onClick={this.resetFilters}
              />
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}

export default SearchFilter
