import React, { Component, Fragment } from 'react'
import { Mutation, Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Button, Icon } from 'semantic-ui-react'
import get from 'lodash/get'

import Preloader from '../components/Preloader'
import User from '../components/User'

interface Props {
  addVideo: Function
  query: {
    id: String
  }
}

export default class CreateVideo extends Component<Props> {
  render() {
    const {
      query: { id },
    } = this.props
    return (
      <User>
        {({ me }) => (
          <Query query={VIDEO_QUERY} variables={{ id }} errorPolicy="all">
            {({ data, loading }) => {
              if (loading) {
                return <Preloader />
              }
              const { video } = data
              const attending = video.attendees.some(item => {
                return get(me, ['id']) === item.id
              })
              return (
                <Mutation
                  mutation={BOOKMARK_VIDEO_MUTATION}
                  variables={{ id, attending: !attending }}
                >
                  {(attendVideo: Function, { loading }) => (
                    <div>
                      <h1 className="ui dividing header">
                        {video.title}
                        <div className="sub header">
                          Organized by {video.organizer.name}
                        </div>
                      </h1>
                      <div className="description">
                        <h3 className="ui header">Details</h3>
                        <p>{video.description}</p>
                        <p>
                          <i className="map marker alternate icon" />{' '}
                          {video.location}
                        </p>
                      </div>
                      {me && (
                        <Fragment>
                          <h3 className="ui header">Are you going?</h3>
                          <Button
                            primary={attending}
                            icon
                            onClick={() =>
                              attendVideo({ id, attending: !attending })
                            }
                            title={attending ? "I'm not going" : "I'm going"}
                            loading={loading}
                          >
                            <Icon
                              name={attending ? 'thumbs down' : 'thumbs up'}
                            />
                          </Button>
                        </Fragment>
                      )}
                      <h3 className="ui header">
                        Attendees: {video.attendees.length}
                      </h3>
                      <div className="ui bulleted list">
                        {video.attendees.length
                          ? video.attendees.map(attendee => (
                              <div key={attendee.id} className="item">
                                {attendee.name}
                              </div>
                            ))
                          : null}
                      </div>
                    </div>
                  )}
                </Mutation>
              )
            }}
          </Query>
        )}
      </User>
    )
  }
}

const VIDEO_QUERY = gql`
  query VIDEO_QUERY($ytId: String!) {
    video(ytId: $ytId) {
      id
      adder {
        name
      }
    }
  }
`

const BOOKMARK_VIDEO_MUTATION = gql`
  mutation BOOKMARK_VIDEO_MUTATION($ytId: String!, $adding: Boolean!) {
    bookmarkVideo(ytId: $ytId, adding: $adding) {
      ytId
    }
  }
`
