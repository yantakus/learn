import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

import VideoForm from 'components/VideoForm'

interface IProps {
  router: {
    query: {
      ytId: string
    }
  }
}

class AddVideo extends Component<IProps> {
  render() {
    return (
      <Query
        query={VIDEO_QUERY}
        variables={{ where: { ytId: this.props.router.query.ytId } }}
      >
        {({ data }) => <VideoForm currentData={data.videos[0]} />}
      </Query>
    )
  }
}

const VIDEO_QUERY = gql`
  query VIDEO_QUERY($where: VideoWhereInput) {
    videos(where: $where) {
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
    }
  }
`

export default AddVideo
