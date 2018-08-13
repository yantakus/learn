import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import Sensor from 'react-visibility-sensor'
import { Loader } from 'semantic-ui-react'
import get from 'lodash/get'
import { Segment } from 'semantic-ui-react'

import Meetups from '../components/Meetups'

class HomePage extends Component {
  state = {
    skip: true,
    fetchMore: true,
  }
  onChange = (active, fetchMore, skip) => {
    if (active) {
      if (this.state.skip) {
        this.setState({ skip: false })
      } else {
        fetchMore({
          variables: {
            skip,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            const left = get(fetchMoreResult, ['meetups', 'length'])
            if (left < 10) {
              this.setState({ fetchMore: false })
            }
            if (!left) {
              return prev
            }
            return Object.assign({}, prev, {
              meetups: [...prev.meetups, ...fetchMoreResult.meetups],
            })
          },
        })
      }
    }
  }
  render() {
    return (
      <Query
        query={query}
        variables={{ skip: 0, first: 10 }}
        skip={this.state.skip}
      >
        {({ data, loading, fetchMore }) => (
          <Segment loading={this.state.skip} basic>
            <Meetups data={data.meetups} loading={loading} />
            <Sensor
              partialVisibility
              delayedCall
              onChange={active =>
                this.onChange(
                  active,
                  fetchMore,
                  get(data, ['meetups', 'length'])
                )
              }
            >
              <Loader
                active={
                  !this.state.skip && data.meetups && this.state.fetchMore
                }
                inline="centered"
                size="large"
                className="tw__mt-10"
              >
                Loading
              </Loader>
            </Sensor>
          </Segment>
        )}
      </Query>
    )
  }
}

export const query = gql`
  query MeetupsQuery($skip: Int, $first: Int) {
    meetups(skip: $skip, first: $first) @connection(key: "meetups") {
      id
      title
      date
      location
      organizer {
        login
        name
      }
      attendees {
        id
      }
    }
  }
`

export default HomePage
