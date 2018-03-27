import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import Paper from 'material-ui/Paper'
import GolfImage from 'material-ui/svg-icons/places/golf-course'
import PageLayout from '../../layouts/PageLayout'
import SpinnerComponent from '../SpinnerComponent'
import SearchFilter from './SearchFilter'
import UserList from '../UserList'
import './SearchPage.scss'

const golfImageStyle = {
  color: 'grey',
  height: '120px',
  width: '120px'
}


class SearchPage extends Component {
  
  componentDidMount() {
    this.getUsersData()
  }
  
  getUsersData = (filters) => {
    this.props.dispatch(filters)
  }
  
  loadFilteredData = (data) => {
    this.getUsersData(data)
  }
  
  render() {
    const { isLoading, users } = this.props
    
    return (
      <PageLayout>
        <div className="friends-page">
          <Helmet>
            <title>NT SN | Search</title>
          </Helmet>
          <div className="col l5 push-l2 m8 s12">
            {
              isLoading
                ? <SpinnerComponent size={120} thickness={8} />
                : <Paper zDepth={1}>
                    {
                      users.length >= 1
                        ? <div>
                            <div className="friends-page__result">
                              Found {this.props.users.length}
                            </div>
                            <UserList
                              users={users}
                              showFullNames={true}
                            />
                          </div>
                        : <div className="friends-page__empty">
                            <GolfImage style={golfImageStyle} />
                            <div>No results</div>
                          </div>
                    }
                  </Paper>
            }
          </div>
          <div className="col l3 push-l2 m4 s12">
            <SearchFilter loadFilteredData={this.loadFilteredData} />
          </div>
        </div>
      </PageLayout>
    )
  }
}

SearchPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default SearchPage
