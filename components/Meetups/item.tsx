import React, { Component } from 'react'
import { format } from 'date-fns'
import Link from 'next/link'

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
      <div key={meetup.id} className="content">
        <Link href={meetup.id}>
          <a className="header">{meetup.title}</a>
        </Link>
        <div className="meta">
          Organized by <strong>{meetup.organizer.name}</strong>
        </div>
        <div className="description">
          <div>
            <i className="calendar icon"></i> {format(meetup.date || new Date(), "DD.MM.YYYY, H:m")}
          </div>
          <div>
            <i className="map marker alternate icon"></i> {meetup.location}
          </div>
        </div>
        <div className="extra">
          <i className="thumbs up icon"></i> {meetup.attendees && meetup.attendees.length <= 1
          ? `${meetup.attendees.length} attendee going`
          : `${meetup.attendees.length} attendees going`}
        </div>
      </div>
    )
  }
}
