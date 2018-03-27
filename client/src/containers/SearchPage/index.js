import { connect } from 'react-redux'
import { getUserList } from '../../actions/users/getUserList'
import SearchPageComponent from '../../components/SearchPage'

const mapDispatchToProps = dispatch => ({
  dispatch: (filters) => {
    dispatch(getUserList(filters))
  }
})

const SearchPage = connect(state => ({
  isLoading: state.isLoading,
  users: state.users
}), mapDispatchToProps)(SearchPageComponent)

export default SearchPage
