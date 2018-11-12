import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

import UserProfile from '../components/UserProfile'

interface Props {
  router: {
    query: {
      login: String
    }
  }
}

class UserPage extends Component<Props> {
  render() {
    const {
      router: {
        query: { login },
      },
    } = this.props
    return (
      <Query query={query} variables={{ login }}>
        {({ data: { user }, loading }) => (
          <UserProfile data={user} loading={loading} />
        )}
      </Query>
    )
  }
}

export const query = gql`
  query UserQuery($login: String!) {
    user(login: $login) {
      name
      login
      rank
    }
  }
`

export default UserPage
