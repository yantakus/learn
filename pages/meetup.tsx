import React, { Component, Fragment } from 'react'
import { Mutation, Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { format } from 'date-fns'
import { Button, Icon } from 'semantic-ui-react'
import Preloader from '../components/Preloader'

interface Props {
  createMeetup: Function
  query: {
    id: String
  }
}

export default class CreateMeetup extends Component<Props> {
  static async getInitialProps ({ query }) {
    return { query }
  }
  render() {
    const { query: { id } } = this.props
    return (
      <Query
        query={query}
        variables={{ id }}
      >
        {({ data: { user, meetup }, loading }) => {
          if (loading) {
            return <Preloader />
          }
          const attending = meetup.attendees.some(item => {
            return item.id === user.id
          })
          return (
            <Mutation
              mutation={mutation}
              variables={{ id, attending: !attending }}
            >
              {(attendMeetup, { loading }) => (
                <div>
                  <h1 className="ui dividing header">
                    {meetup.title}
                    <div className="sub header">Organized by {meetup.organizer.name}</div>
                  </h1>
                  <div className="description">
                    <h3 className="ui header">Details</h3>
                    <p>{meetup.description}</p>
                    <p>
                      <i className="calendar icon"></i> {format(meetup.date || new Date(), "DD.MM.YYYY, H:m")}
                    </p>
                    <p>
                      <i className="map marker alternate icon"></i> {meetup.location}
                    </p>
                  </div>
                  {user &&
                    <Fragment>
                      <h3 className="ui header">Are you going?</h3>
                      <Button
                        primary={attending}
                        icon
                        onClick={() => attendMeetup({ id, attending: !attending })}
                        title={attending ? "I'm not going" : "I'm going"}
                        loading={loading}
                      >
                        <Icon name={attending ? 'thumbs down' : 'thumbs up'} />
                      </Button>
                    </Fragment>
                  }
                  <h3 className="ui header">
                    Attendees: {meetup.attendees.length}
                  </h3>
                  <div className="ui bulleted list">
                    {meetup.attendees.length ? meetup.attendees.map(attendee =>
                      <div
                        key={attendee.id}
                        className="item"
                      >
                        {attendee.name}
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </Mutation>
          )}
        }
      </Query>
    )
  }
}

const query = gql`
  query MeetupQuery($id: ID!) {
    user {
      id
    }
    meetup(id: $id) {
      id
      title
      description
      date
      location
      organizer {
        name
      }
      attendees {
        id
        name
      }
    }
  }
`

const mutation = gql`
  mutation AttendMeetupMutation($id: ID!, $attending: Boolean!) {
    attendMeetup(id: $id, attending: $attending) {
      id
      title
      description
      date
      location
      organizer {
        name
      }
      attendees {
        id
        name
      }
    }
  }
`