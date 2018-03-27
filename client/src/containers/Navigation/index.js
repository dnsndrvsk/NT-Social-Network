import { connect } from 'react-redux'
import NavigationComponent from '../../components/Navigation'

const Navigation = connect(state => ({
  activeUser: state.activeUser
}), {})(NavigationComponent)

export default Navigation
