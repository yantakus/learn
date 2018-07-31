import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

import Meetups from '../components/Meetups'

export default () => (
  <Query query={query}>
    {props => {
      const { data, loading } = props
      return <Meetups data={data.meetups} loading={loading} />
    }}
</Query>
)

export const query = gql`
  {
    meetups {
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
`
