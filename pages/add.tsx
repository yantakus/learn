import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Form, Message } from 'semantic-ui-react'
import redirect from '../lib/redirect'
import { Dropdown } from 'semantic-ui-react'
import { paramCase } from 'change-case'
import printError from '../lib/printError'

// import get from 'lodash/get'
// import { query as indexQuery } from './index'
// import produce from 'immer'

import Preloader from '../components/Preloader'

const complexities = [
  {
    text: 'Elementary',
    value: 'ELEMENTARY',
  },
  {
    text: 'Basic',
    value: 'BASIC',
  },
  {
    text: 'Advanced',
    value: 'ADVANCED',
  },
  {
    text: 'Expert',
    value: 'EXPERT',
  },
]

interface IProps {
  addVideo: Function
}

type Options = Array<{ text: string; value: string }>

interface IState {
  ytId: string
  tagsOptions: Options
  topicsOptions: Options
  tagsValues: Options
  topicsValues: Options
  complexity: String
}

export default class addVideo extends Component<IProps, IState> {
  state = {
    ytId: '',
    tagsOptions: [],
    topicsOptions: [],
    tagsValues: [],
    topicsValues: [],
    complexity: '',
  }

  handleChange = (_e, { name, value }) => {
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  handleMultipleChange = (_e, { name, value }) => {
    this.setState(prevState => ({
      ...prevState,
      [`${name}Values`]: value.map(i => paramCase(i)),
    }))
  }

  handleAddition = (_e, { name, value }) => {
    this.setState(prevState => ({
      ...prevState,
      [`${name}Options`]: [
        { text: value, value: paramCase(value) },
        ...this.state[`${name}Options`],
      ],
    }))
  }

  render() {
    const {
      ytId,
      complexity,
      tagsValues,
      tagsOptions,
      topicsValues,
      topicsOptions,
    } = this.state
    return (
      <Query
        query={query}
        fetchPolicy={'cache-and-network'}
        onCompleted={data =>
          this.setState({ tagsOptions: data.tags, topicsOptions: data.topics })
        }
      >
        {({ loading: queryLoading }) =>
          queryLoading ? (
            <Preloader />
          ) : (
            <Mutation
              mutation={mutation}
              onCompleted={() => redirect({}, '/')}
              // update={(store, { data: { addVideo } }) => {
              //   // read data from cache for this query
              //   const data = store.readQuery({ query }) as IData
              //   // add the new video from this mutation to existing videos
              //   const newData = produce(data, draftState => {
              //     draftState.videos.unshift(addVideo)
              //   })
              //   // write data back to the cache
              //   store.writeQuery({ query, data: newData })
              // }}
            >
              {(addVideo, { loading, error }) => {
                return (
                  <div className="ui stackable three column centered grid container">
                    <div className="column">
                      <h3 className="ui horizontal divider header">
                        Add video
                      </h3>
                      <Form
                        onSubmit={() =>
                          addVideo({
                            variables: {
                              ytId,
                              complexity,
                              tags: {
                                create: tagsOptions.filter(i => !i.__typename),
                                connect: tagsOptions
                                  .filter(i => i.__typename)
                                  .map(({ text, value }) => ({ text, value })),
                              },
                              topics: {
                                create: topicsOptions.filter(
                                  i => !i.__typename
                                ),
                                connect: topicsOptions
                                  .filter(i => i.__typename)
                                  .map(({ text, value }) => ({ text, value })),
                              },
                            },
                          })
                        }
                      >
                        <Form.Field>
                          <label>Youtube video id</label>
                          <Form.Input
                            type="text"
                            name="ytId"
                            value={ytId}
                            required
                            onChange={this.handleChange}
                          />
                        </Form.Field>
                        <Form.Field>
                          <label>Complexity</label>
                          <Dropdown
                            name="complexity"
                            fluid
                            selection
                            options={complexities}
                            value={this.state.complexity}
                            onChange={this.handleChange}
                          />
                        </Form.Field>
                        <Form.Field>
                          <label>Topics</label>
                          <Dropdown
                            name="topics"
                            options={topicsOptions}
                            search
                            selection
                            fluid
                            multiple
                            allowAdditions
                            value={topicsValues}
                            onAddItem={this.handleAddition}
                            onChange={this.handleMultipleChange}
                          />
                        </Form.Field>
                        <Form.Field>
                          <label>Tags</label>
                          <Dropdown
                            name="tags"
                            options={tagsOptions}
                            search
                            selection
                            fluid
                            multiple
                            allowAdditions
                            value={tagsValues}
                            onAddItem={this.handleAddition}
                            onChange={this.handleMultipleChange}
                          />
                        </Form.Field>
                        <Form.Button
                          loading={loading}
                          primary
                          content="Add Video"
                        />
                      </Form>
                      {error && <Message error>{printError(error)}</Message>}
                    </div>
                  </div>
                )
              }}
            </Mutation>
          )
        }
      </Query>
    )
  }
}

const query = gql`
  query {
    topics {
      text
      value
    }
    tags {
      text
      value
    }
  }
`

const mutation = gql`
  mutation(
    $ytId: String!
    $complexity: Complexity!
    $topics: TopicCreateManyInput!
    $tags: TagCreateManyInput!
  ) {
    addVideo(
      ytId: $ytId
      complexity: $complexity
      topics: $topics
      tags: $tags
    ) {
      ytId
    }
  }
`
