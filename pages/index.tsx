import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import Sensor from 'react-visibility-sensor'
import { Loader } from 'semantic-ui-react'
import get from 'lodash/get'
import { Segment } from 'semantic-ui-react'

import Videos from '../components/Videos'

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
            const left = get(fetchMoreResult, ['videos', 'length'])
            if (left < 10) {
              this.setState({ fetchMore: false })
            }
            if (!left) {
              return prev
            }
            return Object.assign({}, prev, {
              videos: [...prev.videos, ...fetchMoreResult.videos],
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
        variables={{ skip: 0, first: 20 }}
        skip={this.state.skip}
      >
        {({ data, fetchMore, loading }) => (
          <Segment loading={this.state.skip} basic>
            <Videos data={data.videos} loading={loading} />
            <Sensor
              partialVisibility
              delayedCall
              onChange={active =>
                this.onChange(
                  active,
                  fetchMore,
                  get(data, ['videos', 'length'])
                )
              }
            >
              <Loader
                active={!this.state.skip && data.videos && this.state.fetchMore}
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
  query VideosQuery($skip: Int, $first: Int) {
    videos(skip: $skip, first: $first) @connection(key: "videos") {
      ytId
    }
  }
`

export default HomePage
