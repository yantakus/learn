import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

import User from '../components/User'

interface Props {
  query: {
    login: String
  }
}

class UserPage extends Component<Props> {
  static async getInitialProps ({ query }) {
    return { query }
  }
  render() {
    const { query: { login }} = this.props
    return (
      <Query
        query={query}
        variables={{ login }}
      >
        {({ data, loading }) => <User data={data} loading={loading} />}
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
