import React, { Component, Fragment } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

import Preloader from '../Preloader'
import Meetup from './item'

interface Props {
  data: {
    meetups?: [{
      id: string,
      title: string,
      organizer: {
        name: string
      },
      location: string,
      date: string,
      attendees: [{}]
    }]
  }
  loading: boolean
}

export default class Meetups extends Component {
  render () {
    return (
      <Query query={query}>
        {(props: Props) => {
          const { data, loading } = props
          if (loading) {
            return <Preloader />
          }
          return (
            <Fragment>
              <h2 className="ui header">All Meetups</h2>
              <div className="ui divided items">
              <div
                className="item"
              >
                {data.meetups.length ? data.meetups.map(meetup => (
                  <Meetup key={meetup.id} meetup={meetup} />
                )) : 'No meetups yet'}
                </div>
              </div>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

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
