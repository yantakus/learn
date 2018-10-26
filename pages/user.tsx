import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import get from 'lodash/get'

import UserProfile from '../components/UserProfile'

interface Props {
  query: {
    login: String
  }
}

class UserPage extends Component<Props> {
  render() {
    const {
      query: { login },
    } = this.props
    return (
      <Query query={query} variables={{ login }}>
        {({ data, loading }) => (
          <UserProfile data={get(data, ['user'])} loading={loading} />
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
      email
    }
  }
`

export default UserPage
