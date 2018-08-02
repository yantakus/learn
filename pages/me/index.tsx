import React, { Component, Fragment } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import Link from 'next/link'
import { Divider } from 'semantic-ui-react'

import User from '../../components/User'

class UserPage extends Component {
  render() {
    return (
      <Query
        query={query}
      >
        {({ data, loading }) => <Fragment>
          <User data={data} loading={loading} />
          {data.user && <Fragment>
            <Divider />
            <Link href="/me/edit"><a>Edit profile</a></Link>
          </Fragment>}
        </Fragment>}
      </Query>
    )
  }
}

export const query = gql`
  {
    user {
      id
      name
      login
      email
    }
  }
`

export default UserPage
