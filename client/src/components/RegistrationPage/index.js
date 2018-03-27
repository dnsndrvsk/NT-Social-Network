import React from 'react'
import { Helmet } from 'react-helmet'
import CenteredLayout from '../../layouts/CenteredLayout'
import RegistrationForm from '../../containers/RegistrationForm'
import WithRouterLogged from '../../containers/WithRouter/WithRouterLogged'


const RegistrationPage = (props) => (
  <WithRouterLogged>
    <CenteredLayout>
      <div>
        <Helmet>
          <title>NT SN | Registration</title>
        </Helmet>

        <RegistrationForm />
      </div>
    </CenteredLayout>
  </WithRouterLogged>
)

export default RegistrationPage
