import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Message } from 'semantic-ui-react'
import { Form, Input, Dropdown } from 'formsy-semantic-ui-react'
import redirect from '../lib/redirect'
import { paramCase } from 'change-case'
import printError from '../lib/printError'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import cx from 'classnames'
import debounce from 'lodash/debounce'
import { addValidationRule } from 'formsy-react'
import fetch from 'isomorphic-unfetch'

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

// addValidationRule('isValidYtId', (_values, value) => {
//   // console.log(value)
//   // let requestId
//   if (value.trim().length === 11) {
//     fetch(
//       `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyBy-34x0QPvNx6FsniDEeCT1PVur_fk528&id=${value}`
//     ).then(json => {
//       console.log(json)
//       if (!json) {
//         return Promise.reject()
//       }
//       return Promise.resolve(true)
//     })
//   }
//   return false
//   // if (requestId) {
//   // const result = debounce(fetchVideo, 300, value)
//   // return () => debounce(() => console.log(value), 300)
//   // }
// })

interface IProps {
  addVideo: Function
}

type Options = Array<{ text: string; value: string }>

interface IState {
  ytId: string
  ytIdError: string
  validYtId: string
  tags: Options
  tagsOptions: Options
  tagsValue: Array<string>
  topics: Options
  topicsOptions: Options
  topicsValue: Array<string>
  complexity?: String
  isValidYtId: boolean
}

const errorLabel = <label />

const createManyInput = data => {
  const result: { connect?: []; create?: [] } = {}
  const create = data.filter(i => !i.__typename)
  const connect = data
    .filter(i => i.__typename)
    .map(({ text, value }) => ({ text, value }))
  if (!isEmpty(create)) {
    result.create = create
  }
  if (!isEmpty(connect)) {
    result.connect = connect
  }
  return isEmpty(result) ? undefined : result
}

export default class addVideo extends Component<IProps, IState> {
  state = {
    ytId: '',
    ytIdError: '',
    validYtId: '',
    tags: [],
    tagsOptions: [],
    tagsValue: [],
    topics: [],
    topicsOptions: [],
    topicsValue: [],
    complexity: null,
    isValidYtId: false,
  }

  handleChange = (_e, { name, value }) => {
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  validate = (_e, { name, value }) => {
    this.handleChange(null, { name, value })
    if (value.trim().length === 11) {
      fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyBy-34x0QPvNx6FsniDEeCT1PVur_fk528&id=${value}`
      )
        .then(response => response.json())
        .then(json => {
          if (!json.pageInfo.totalResults) {
            this.setState({ ytIdError: 'Invalid youtube video id or url' })
          } else {
            console.log(json)
          }
        })
    }
  }

  handleMultipleChange = (_e, { name, options, value }) => {
    this.setState(prevState => ({
      ...prevState,
      [`${name}Value`]: value.map(i => paramCase(i)),
      [`${name}`]: value.map(i => {
        const existing = find(options, o => o.value === i)
        return existing || { text: i, value: paramCase(i) }
      }),
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
      ytIdError,
      complexity,
      tags,
      tagsValue,
      tagsOptions,
      topics,
      topicsValue,
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
            <Mutation mutation={mutation} onCompleted={() => redirect({}, '/')}>
              {(addVideo, { loading, error }) => {
                return (
                  <div className="ui stackable three column centered grid container">
                    <div className="column">
                      <h3 className="ui horizontal divider header">
                        Add video
                      </h3>
                      <Form
                        onValidSubmit={() =>
                          addVideo({
                            variables: {
                              ytId,
                              complexity,
                              tags: createManyInput(tags),
                              topics: createManyInput(topics),
                            },
                          })
                        }
                      >
                        <Form.Field>
                          <label>Youtube video id or url</label>
                          <Input
                            className={cx({ 'error mb-0': ytIdError })}
                            type="text"
                            name="ytId"
                            value={ytId}
                            onChange={this.validate}
                            required
                            validationErrors={{
                              isDefaultRequiredValue: 'This field is required',
                            }}
                            errorLabel={errorLabel}
                          />
                          {ytIdError && (
                            <div className="field error">
                              <label>{ytIdError}</label>
                            </div>
                          )}
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
                            required
                            validationErrors={{
                              isDefaultRequiredValue: 'This field is required',
                            }}
                            errorLabel={errorLabel}
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
                            value={topicsValue}
                            onAddItem={this.handleAddition}
                            onChange={this.handleMultipleChange}
                            required
                            validations="minLength:1"
                            validationErrors={{
                              minLength: 'This field is required',
                            }}
                            errorLabel={errorLabel}
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
                            value={tagsValue}
                            onAddItem={this.handleAddition}
                            onChange={this.handleMultipleChange}
                            required
                            validations="minLength:1"
                            validationErrors={{
                              minLength: 'This field is required',
                            }}
                            errorLabel={errorLabel}
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
