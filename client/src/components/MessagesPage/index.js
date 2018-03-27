import React from 'react'
import { Helmet } from 'react-helmet'
import PageLayout from '../../layouts/PageLayout'
import MessagesList from '../../containers/MessagesList'
import WithRouterNotLogged from '../../containers/WithRouter/WithRouterNotLogged'
import './MessagesPage.scss'

const MessagesPage = (props) => (
  <WithRouterNotLogged>
    <PageLayout>
      <div className="messages-page">
        <Helmet>
          <title>NT SN | Messages</title>
        </Helmet>
        <div className="messages-page__item">
          <MessagesList />
        </div>
      </div>
    </PageLayout>
  </WithRouterNotLogged>
)

export default MessagesPage
