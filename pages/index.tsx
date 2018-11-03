import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import get from 'lodash/get'

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
      <Query query={VIDEOS_QUERY}>
        {({ data, loading }) => {
          return <Videos data={data.videos} loading={loading} />
        }}
      </Query>
    )
  }
}

export const VIDEOS_QUERY = gql`
  query VIDEOS_QUERY {
    videos(skip: 0, first: 20, orderBy: "createdAt_DESC") {
      ytId
      complexity
      language {
        text
        value
      }
      tags {
        text
        value
      }
      topics {
        text
        value
      }
      snippet
    }
  }
`

export default HomePage
