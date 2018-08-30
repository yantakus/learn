import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import get from 'lodash/get'
import Message from '../components/Message'
import Preloader from '../components/Preloader'
import printError from '../lib/printError'

interface IProps {
  activate: Function
  data: Object
  loading: Boolean
  error: Error
  activationCode: String
}

class Activate extends Component<IProps> {
  componentDidMount() {
    const { activate, activationCode } = this.props
    activate({ variables: { activationCode } })
  }
  render() {
    const { loading, data, error } = this.props
    const message = get(data, 'message')
    return (
      <Fragment>
        {loading ? (
          <Preloader height={66} />
        ) : error ? (
          <Message error content={printError(error)} />
        ) : (
          <Message success content={message} />
        )}
        <Link href="/signin">
          <a>Sign In</a>
        </Link>
      </Fragment>
    )
  }
}

interface IPageProps {
  query: {
    id: String
  }
}

export default class ActivatePage extends Component<IPageProps> {
  static getInitialProps({ query }) {
    return { query }
  }
  render() {
    const {
      query: { id },
    } = this.props
    return (
      <Mutation mutation={mutation}>
        {(activate, { data, loading, error }) => (
          <div className="ui stackable three column centered grid container">
            <div className="column">
              <h3 className="ui horizontal divider header">
                Account activation
              </h3>
              <div className="ui divider" />
              <div className="ui column grid">
                <div className="center aligned column">
                  <Activate
                    data={get(data, 'activate')}
                    loading={loading}
                    error={error}
                    activate={activate}
                    activationCode={id}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    )
  }
}

const mutation = gql`
  mutation SignupMutation($activationCode: String!) {
    activate(activationCode: $activationCode) {
      message
    }
  }
`
