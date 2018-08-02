import React, { Component } from 'react'
import { Query } from 'react-apollo'

import Preloader from '../../components/Preloader'
import EditProfile from '../../components/EditProfile'
import { query } from './index'

export default class Signin extends Component {
  render() {
    return (
      <Query
        query={query}
      >
        {({ data, loading }) => {
          if (loading) {
            return <Preloader />
          } else {
            return <EditProfile data={data?.user} />
          }
        }}
      </Query>
    )
  }
}
