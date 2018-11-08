import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'
import { getOperationName } from 'apollo-utilities'
import { gql } from 'apollo-boost'
import { Button, Icon, Popup } from 'semantic-ui-react'
import get from 'lodash/get'

import Preloader from '../components/Preloader'
import User from '../components/User'
import Youtube from '../components/Youtube'

interface IProps {
  addVideo: Function
  router: {
    query: {
      ytId: string
    }
  }
}

export default class VideoPage extends Component<IProps> {
  render() {
    const {
      router: {
        query: { ytId },
      },
    } = this.props
    return (
      <User>
        {({ data: { me } }) => (
          <Query query={VIDEO_QUERY} variables={{ ytId }} errorPolicy="all">
            {({ data, loading }) => {
              if (loading) {
                return <Preloader />
              }
              const {
                video: { id, adder, snippet, bookmarkers },
              } = data
              const bookmarked = bookmarkers.some(item => {
                return get(me, ['id']) === item.id
              })
              return (
                <Mutation
                  mutation={BOOKMARK_VIDEO_MUTATION}
                  refetchQueries={[getOperationName(VIDEO_QUERY)]}
                >
                  {(bookmarkVideo: Function, { loading }) => (
                    <div>
                      <Youtube className="mb-5" id={ytId} />
                      <div className="border-b mb-5">
                        <div className="flex items-center -mx-2">
                          <h4 className="flex-1 px-2">Added by {adder.name}</h4>
                          {me && (
                            <div className="flex-initial p-2">
                              <Popup
                                trigger={
                                  <Button
                                    className="small"
                                    primary={bookmarked}
                                    icon
                                    onClick={() =>
                                      bookmarkVideo({
                                        variables: { id, adding: !bookmarked },
                                      })
                                    }
                                    loading={loading}
                                  >
                                    <Icon
                                      name={
                                        bookmarked
                                          ? 'bookmark'
                                          : 'bookmark outline'
                                      }
                                    />
                                  </Button>
                                }
                                content={
                                  bookmarked
                                    ? 'Remove from bookmarks'
                                    : 'Bookmark'
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="description">
                        <h3 className="ui header">Details</h3>
                        <p>{snippet.description}</p>
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
      ytId
      complexity
      tags {
        value
        text
      }
      topics {
        value
        text
      }
      language {
        text
      }
      snippet
      adder {
        name
      }
      bookmarkers {
        id
      }
    }
  }
`

const BOOKMARK_VIDEO_MUTATION = gql`
  mutation BOOKMARK_VIDEO_MUTATION($id: ID!, $adding: Boolean!) {
    bookmarkVideo(id: $id, adding: $adding) {
      ytId
    }
  }
`
