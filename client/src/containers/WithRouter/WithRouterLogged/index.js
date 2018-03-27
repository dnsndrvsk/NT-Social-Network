import { connect } from 'react-redux'
import WithRouterLoggedComponent from '../../../components/WithRouter/WithRouterLogged'

const WithRouterLogged = connect(state => ({
  activeUser: state.activeUser
}), {})(WithRouterLoggedComponent)

export default WithRouterLogged
