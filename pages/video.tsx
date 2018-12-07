import React, { Fragment } from 'react'
import { Query, Mutation } from '../components/Epitath'
import { getOperationName } from 'apollo-utilities'
import { gql } from 'apollo-boost'
import { Button, Icon, Popup } from 'semantic-ui-react'
import get from 'lodash/get'
import find from 'lodash/find'
import epitath from 'epitath'

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

const VideoPage = epitath(function*({
  router: {
    query: { ytId },
  },
}: IProps) {
  const me = yield <User />
  const { data, loading: queryLoading } = yield (
    <Query query={VIDEO_QUERY} variables={{ ytId }} errorPolicy="all" />
  )
  const [bookmark, { loading: bookmarkMutationLoading }] = yield (
    <Mutation
      mutation={BOOKMARK_VIDEO_MUTATION}
      refetchQueries={[getOperationName(VIDEO_QUERY)]}
    />
  )
  const [vote, { loading: voteMutationLoading }] = yield (
    <Mutation
      mutation={VOTE_VIDEO_MUTATION}
      refetchQueries={[getOperationName(VIDEO_QUERY)]}
    />
  )
  if (queryLoading) {
    return <Preloader />
  }
  const {
    video: { id, adder, snippet, bookmarkers, votes, voteScore },
  } = data
  const bookmarked = bookmarkers.some(item => {
    return get(me, 'id') === item.id
  })
  const existingVote = find(votes, item => {
    return get(me, 'id') === item.user.id
  })
  const existingUpVote = get(existingVote, 'type') === 'UP'
  const existingDownVote = get(existingVote, 'type') === 'DOWN'
  return (
    <Fragment>
      <Youtube className="mb-5" id={ytId} />
      <div className="border-b pb-6 mb-6">
        <div className="flex -mx-2">
          <div className="flex-initial px-2 text-center">
            <Button
              loading={voteMutationLoading}
              primary={existingUpVote}
              onClick={() =>
                vote({ variables: { id, type: 'UP', adding: !existingUpVote } })
              }
              icon="chevron up"
            />
            <div className="text-4xl py-3">
              <strong>{voteScore}</strong>
            </div>
            <Button
              loading={voteMutationLoading}
              primary={existingDownVote}
              onClick={() =>
                vote({
                  variables: { id, type: 'DOWN', adding: !existingDownVote },
                })
              }
              icon="chevron down"
            />
          </div>
          <div className="flex flex-col flex-1 px-2">
            <div className="flex -mx-2">
              <h4 className="flex-1 px-2">Added by {adder.name}</h4>
              {me && (
                <div className="flex-initial px-2">
                  <Popup
                    trigger={
                      <Button
                        className="small"
                        primary={bookmarked}
                        icon
                        onClick={() =>
                          bookmark({
                            variables: {
                              id,
                              adding: !bookmarked,
                            },
                          })
                        }
                        loading={bookmarkMutationLoading}
                      >
                        <Icon
                          name={bookmarked ? 'bookmark' : 'bookmark outline'}
                        />
                      </Button>
                    }
                    content={bookmarked ? 'Remove from bookmarks' : 'Bookmark'}
                  />
                </div>
              )}
            </div>
            <h3 className="mt-auto leading-none">Details</h3>
          </div>
        </div>
      </div>
      <div className="description">
        <p>{snippet.description}</p>
      </div>
    </Fragment>
  )
})

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
      votes {
        type
        user {
          id
        }
      }
      voteScore
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

const VOTE_VIDEO_MUTATION = gql`
  mutation VOTE_VIDEO_MUTATION($id: ID!, $type: VoteType!, $adding: Boolean!) {
    voteVideo(id: $id, type: $type, adding: $adding) {
      ytId
    }
  }
`

export default VideoPage
