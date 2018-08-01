import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

import Meetups from '../components/Meetups'

export default () => (
  <Query query={query}>
    {props => {
      const { data, loading } = props
      console.log(data)
      if (!data?.user && !loading) {
        return "You are not logged in"
      }
      return <Meetups data={data?.user?.meetupsAttending} loading={loading} />
    }}
  </Query>
)

export const query = gql`
  {
    user {
      id
      meetupsAttending {
        id
        title
        date
        location
        organizer {
          name
        }
        attendees {
          id
        }
      }
    }
  }
`
