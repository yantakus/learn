import React, { Fragment } from 'react'
import { getOperationName } from 'apollo-utilities'
import { gql } from 'apollo-boost'
import { Button, Popup } from 'semantic-ui-react'
import get from 'lodash/get'
import find from 'lodash/find'
import filter from 'lodash/filter'
import { useQuery, useMutation } from '@apollo/react-hooks'

import Preloader from 'components/Preloader'
import User from 'components/User'
import Youtube from 'components/Youtube'

interface IProps {
  addVideo: Function
  router: {
    query: {
      ytId: string
    }
  }
}

const vote = ({
  type,
  adding,
  upVote,
  downVote,
  videoId,
  userId,
  ytId,
  voteScore,
  votes,
  voteMutation,
}) => {
  const doubleAction =
    (type === 'UP' && downVote) || (type === 'DOWN' && upVote)
  const scoreDiff = doubleAction ? 2 : 1
  const add = arr => [
    ...arr,
    {
      type,
      user: {
        id: userId,
        __typename: 'User',
      },
      __typename: 'Vote',
    },
  ]
  const remove = arr => filter(arr, o => o.user.id !== userId)
  voteMutation({
    variables: { id: videoId, type, adding },
    optimisticResponse: {
      voteVideo: {
        voteScore:
          (adding && type === 'UP') || (!adding && type === 'DOWN')
            ? voteScore + scoreDiff
            : voteScore - scoreDiff,
        votes: doubleAction
          ? add(remove(votes))
          : adding
          ? add(votes)
          : remove(votes),
        __typename: 'Video',
      },
      __typename: 'Mutation',
    },
    update: (
      proxy,
      {
        data: {
          voteVideo: { voteScore, votes },
        },
      }
    ) => {
      const data = proxy.readQuery({
        query: VIDEO_QUERY,
        variables: { ytId },
      })
      data.video = {
        ...data.video,
        voteScore,
        votes,
      }
      proxy.writeQuery({ query: VIDEO_QUERY, data })
    },
  })
}

const VideoPage = (props: IProps) => (
  <User>
    {me => {
      const ytId = props.router?.query?.ytId
      const { data, loading: queryLoading } = useQuery(VIDEO_QUERY, {
        variables: { ytId },
        errorPolicy: 'all',
      })
      const [bookmark, { loading: bookmarkMutationLoading }] = useMutation(
        BOOKMARK_VIDEO_MUTATION,
        {
          refetchQueries: [getOperationName(VIDEO_QUERY)],
        }
      )
      const [voteMutation, { loading: voteMutationLoading }] = useMutation(
        VOTE_VIDEO_MUTATION,
        {
          refetchQueries: [getOperationName(VIDEO_QUERY)],
        }
      )
      if (queryLoading) {
        return <Preloader />
      }
      const {
        video: { id: videoId, adder, snippet, bookmarkers, votes, voteScore },
        me: { id: userId },
      } = data
      const bookmarked = bookmarkers.some(item => {
        return get(me, 'id') === item.id
      })
      const existingVote = find(votes, item => {
        return get(me, 'id') === item.user.id
      })
      const upVote = get(existingVote, 'type') === 'UP'
      const downVote = get(existingVote, 'type') === 'DOWN'
      return (
        <Fragment>
          <Youtube className="mb-5" id={ytId} />
          <div className="border-b pb-6 mb-6">
            <div className="flex -mx-2">
              <div className="flex-initial px-2 text-center">
                <Button
                  primary={upVote}
                  disabled={voteMutationLoading}
                  onClick={() =>
                    vote({
                      type: 'UP',
                      adding: !upVote,
                      upVote,
                      downVote,
                      videoId,
                      userId,
                      ytId,
                      voteScore,
                      votes,
                      voteMutation,
                    })
                  }
                  icon="chevron up"
                />
                <div className="text-4xl py-3">
                  <strong>{voteScore}</strong>
                </div>
                <Button
                  primary={downVote}
                  disabled={voteMutationLoading}
                  onClick={() =>
                    vote({
                      type: 'DOWN',
                      adding: !downVote,
                      upVote,
                      downVote,
                      videoId,
                      userId,
                      ytId,
                      voteScore,
                      votes,
                      voteMutation,
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
                            icon={bookmarked ? 'bookmark' : 'bookmark outline'}
                            onClick={() => {
                              const adding = !bookmarked
                              bookmark({
                                variables: {
                                  id: videoId,
                                  adding,
                                },
                                optimisticResponse: {
                                  bookmarkVideo: {
                                    bookmarkers: adding
                                      ? [
                                          ...bookmarkers,
                                          {
                                            id: userId,
                                            __typename: 'User',
                                          },
                                        ]
                                      : filter(
                                          bookmarkers,
                                          o => o.id !== userId
                                        ),
                                    __typename: 'Video',
                                  },
                                  __typename: 'Mutation',
                                },
                                update: (
                                  proxy,
                                  {
                                    data: {
                                      bookmarkVideo: { bookmarkers },
                                    },
                                  }
                                ) => {
                                  const data: any = proxy.readQuery({
                                    query: VIDEO_QUERY,
                                    variables: { ytId },
                                  })
                                  data.video = {
                                    ...data.video,
                                    bookmarkers,
                                  }
                                  proxy.writeQuery({ query: VIDEO_QUERY, data })
                                },
                              })
                            }}
                            disabled={bookmarkMutationLoading}
                          />
                        }
                        content={
                          bookmarked ? 'Remove from bookmarks' : 'Bookmark'
                        }
                      />
                    </div>
                  )}
                </div>
                <h3 className="mt-auto leading-none">Details</h3>
              </div>
            </div>
          </div>
          <div className="description">
            <p>{get(snippet, 'description', 'This video is unavailable.')}</p>
          </div>
        </Fragment>
      )
    }}
  </User>
)

const votes = `
  votes {
    type
    user {
      id
    }
  }
  voteScore
`

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
        id
        name
      }
      bookmarkers {
        id
      }
      ${votes}
    }
    me {
      id
    }
  }
`

const BOOKMARK_VIDEO_MUTATION = gql`
  mutation BOOKMARK_VIDEO_MUTATION($id: ID!, $adding: Boolean!) {
    bookmarkVideo(id: $id, adding: $adding) {
      bookmarkers {
        id
      }
    }
  }
`

const VOTE_VIDEO_MUTATION = gql`
  mutation VOTE_VIDEO_MUTATION($id: ID!, $type: VoteType!, $adding: Boolean!) {
    voteVideo(id: $id, type: $type, adding: $adding) {
      ${votes}
    }
  }
`

export default VideoPage
