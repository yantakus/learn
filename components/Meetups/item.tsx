import React, { Component } from 'react'
import { format } from 'date-fns'
import Link from 'next/link'
import { Card, Icon } from 'semantic-ui-react'

interface Props {
  meetup: {
    id: string,
    title: string,
    organizer: {
      name: string
    },
    location: string,
    date: string,
    attendees: [{}]
  }
}

export default class Meetup extends Component<Props> {
  render () {
    const { meetup } = this.props
    return (
      <Card key={meetup.id}>
        <Card.Content>
          <Card.Header>
            <Link href={`meetup?id=${meetup.id}`}>
              <a>{meetup.title}</a>
            </Link>
          </Card.Header>
          <Card.Meta>
            Organized by <strong>{meetup.organizer.name}</strong>
          </Card.Meta>
          <Card.Description>
            <div>
              <Icon name="calendar"/> {format(meetup.date || new Date(), "DD.MM.YYYY, H:m")}
            </div>
            <div>
              <Icon name="map marker alternate" /> {meetup.location}
            </div>
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Icon name="thumbs up" /> {meetup.attendees && meetup.attendees.length <= 1
          ? `${meetup.attendees.length} attendee going`
          : `${meetup.attendees.length} attendees going`}
        </Card.Content>
      </Card>
    )
  }
}
