import React, { Component, Fragment } from 'react'
import { Card } from 'semantic-ui-react'

import Preloader from '../Preloader'
import Meetup from './item'

interface Props {
  data?: [{
    id: string,
    title: string,
    organizer: {
      name: string
    },
    location: string,
    date: string,
    attendees: [{}]
  }]
  loading: boolean
}

export default class Meetups extends Component<Props> {
  render () {
    const { data, loading } = this.props
    if (loading) {
      return <Preloader />
    }
    if (!data) return null
    return (
      <Fragment>
        <h2 className="ui header">All Meetups</h2>
        <Card.Group itemsPerRow={2}>
          {data.length ? data.map(meetup => (
            <Meetup key={meetup.id} meetup={meetup} />
          )) : 'No meetups yet'}
        </Card.Group>
      </Fragment>
    )
  }
}


