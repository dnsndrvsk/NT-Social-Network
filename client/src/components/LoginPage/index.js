import React from 'react'
import { Helmet } from 'react-helmet'
import CenteredLayout from '../../layouts/CenteredLayout'
import LoginForm from '../../containers/LoginForm'
import WithRouterLogged from '../../containers/WithRouter/WithRouterLogged'

const LoginPage = (props) => (
  <WithRouterLogged>
    <CenteredLayout>
      <div>
        <Helmet>
          <title>NT SN | Login</title>
        </Helmet>

        <LoginForm />
      </div>
    </CenteredLayout>
  </WithRouterLogged>
)

export default LoginPage
