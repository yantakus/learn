import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Form } from 'semantic-ui-react'
import redirect from '../lib/redirect'
import { query } from './index'

interface Props {
  createMeetup: Function
}

export default class CreateMeetup extends Component<Props> {
  state = { title: '', location: '', date: '', description: '' }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  render() {
    const { title, location, date, description } = this.state
    return (
      <Mutation
        mutation={mutation}
        onCompleted={() => redirect({}, '/')}
        variables={{ title, location, date, description }}
        update={(store, { data: { createMeetup } }) => {
          // read data from cache for this query
          const data = store.readQuery({ query })
          // add the new meetup from this mutation to existing meetups
          data.meetups.unshift(createMeetup)
          // write data back to the cache
          store.writeQuery({ query, data })
        }}
      >
        {(createMeetup, { loading }) => (
          <div className="ui stackable three column centered grid container">
            <div className="column">
              <h3 className="ui horizontal divider header">Sign Up</h3>
              <Form
                onSubmit={() =>
                  createMeetup({ title, location, date, description })
                }
              >
                <div className="field">
                  <label>Title</label>
                  <Form.Input
                    type="text"
                    name="title"
                    value={title}
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field">
                  <label>Location</label>
                  <Form.Input
                    type="text"
                    name="location"
                    value={location}
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field">
                  <label>Date</label>
                  <Form.Input
                    type="datetime-local"
                    name="date"
                    value={date}
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field">
                  <label>Description</label>
                  <Form.Input
                    type="text"
                    name="description"
                    value={description}
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <Form.Button
                  loading={loading}
                  primary
                  content="Create Meetup"
                />
              </Form>
            </div>
          </div>
        )}
      </Mutation>
    )
  }
}

const mutation = gql`
  mutation(
    $title: String!
    $location: String!
    $date: DateTime!
    $description: String!
  ) {
    createMeetup(
      title: $title
      location: $location
      date: $date
      description: $description
    ) {
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
