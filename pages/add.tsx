import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import { Message } from 'semantic-ui-react'
import { Form, Input, Dropdown } from 'formsy-semantic-ui-react'
import redirect from '../lib/redirect'
import { paramCase } from 'change-case'
import printError from '../lib/printError'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import cx from 'classnames'
import fetch from 'isomorphic-unfetch'

import Youtube from '../components/Youtube'
import Private from '../components/Private'

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

interface IProps {}

type Options = Array<{ text: string; value: string }>

interface IState {
  ytId: string
  ytIdError: string
  ytValue: string
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

class AddVideo extends Component<IProps, IState> {
  static getDerivedStateFromProps(newProps, oldState) {
    if (!oldState.tagsOptions && newProps.data.tags) {
      return {
        tagsOptions: newProps.data.tags,
        topicsOptions: newProps.data.topics,
      }
    }
    return null
  }
  state = {
    ytId: '',
    ytValue: '',
    ytIdError: '',
    tags: [],
    tagsOptions: null,
    tagsValue: [],
    topics: [],
    topicsOptions: null,
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

  validate = (_e, { name, value: initialValue }) => {
    const validLength = 11
    const trimmedValue = initialValue.trim()
    let value = trimmedValue
    if (value.startsWith('http')) {
      value = value.substr(value.length - validLength)
    }
    this.handleChange(null, { name, value: trimmedValue })
    if (value.length === validLength) {
      fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyBy-34x0QPvNx6FsniDEeCT1PVur_fk528&id=${value}`
      )
        .then(response => response.json())
        .then(json => {
          if (!json.pageInfo.totalResults) {
            this.setState({
              ytIdError: 'Invalid youtube video id or url',
              ytId: '',
            })
          } else {
            this.setState({
              ytIdError: '',
              ytId: value,
            })
          }
        })
    } else {
      this.setState({
        ytIdError: 'Invalid youtube video id or url',
        ytId: '',
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
      ytIdError,
      ytId,
      ytValue,
      complexity,
      tags,
      tagsValue,
      tagsOptions,
      topics,
      topicsValue,
      topicsOptions,
    } = this.state

    return (
      <Private>
        <Mutation mutation={mutation} onCompleted={() => redirect({}, '/')}>
          {(addVideo, { loading, error }) => {
            return (
              <Fragment>
                {ytId && <Youtube className="mb-10" id={ytId} />}
                <div className="ui stackable two column centered grid container">
                  <div className="column">
                    <h3 className="ui horizontal divider header">Add video</h3>
                    <Form
                      onValidSubmit={() => {
                        if (!ytIdError) {
                          addVideo({
                            variables: {
                              ytId,
                              complexity,
                              tags: createManyInput(tags),
                              topics: createManyInput(topics),
                            },
                          })
                        }
                      }}
                    >
                      <Form.Field>
                        <label>Youtube video url or id</label>
                        <Input
                          className={cx({ 'error mb-0': ytIdError })}
                          type="text"
                          name="ytValue"
                          value={ytValue}
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
              </Fragment>
            )
          }}
        </Mutation>
      </Private>
    )
  }
}

const VIDEO_META_QUERY = gql`
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
    $topics: TopicCreateWithoutParentInput!
    $tags: TagCreateWithoutParentInput!
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

export default graphql(VIDEO_META_QUERY)(AddVideo)
