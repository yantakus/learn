import React, { Component } from 'react'
import Link from 'next/link'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Form } from 'semantic-ui-react'
import cookie from 'cookie'
import get from 'lodash/get'

import redirect from '../lib/redirect'
import printError from '../lib/printError'
import { userQuery } from '../components/Menu'
import Message from '../components/Message'

export default class Signin extends Component {
  static getInitialProps({ query }) {
    return { query }
  }
  state = { login: '', password: '', errorMessage: '' }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  render() {
    const { login, password, errorMessage } = this.state
    return (
      <Mutation
        mutation={mutation}
        onCompleted={() =>
          redirect({}, get(this.props, ['query', 'redirect'], '/'))
        }
        update={(
          store,
          {
            data: {
              signin: { token, currentUser },
            },
          }
        ) => {
          if (currentUser.isActivated) {
            document.cookie = cookie.serialize('token', token, {
              maxAge: 30 * 24 * 60 * 60, // 30 days
            })
            store.writeQuery({
              query: userQuery,
              data: { currentUser },
            })
          } else {
            this.setState({
              errorMessage:
                'Account is not activated. Check your email to activate it first.',
            })
          }
        }}
      >
        {(signin, { loading, error }) => (
          <div className="ui stackable two column centered grid container">
            <div className="column">
              <h3 className="ui horizontal divider header">Sign In</h3>
              <Form
                onSubmit={() => signin({ variables: { login, password } })}
                error={Boolean(error)}
              >
                <div className="field">
                  <label>Login or email</label>
                  <Form.Input
                    type="text"
                    name="login"
                    value={login}
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field">
                  <label>Password</label>
                  <Form.Input
                    type="password"
                    name="password"
                    value={password}
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <Form.Button loading={loading} primary content="Sign In" />
                <Message error content={printError(error)} />
              </Form>
              <Message error content={errorMessage} />
              <div className="ui divider" />
              <div className="ui column grid">
                <div className="aligned column">
                  <p>
                    Don't have an account?{' '}
                    <Link href="/signup">
                      <a>Sign Up</a>
                    </Link>
                  </p>
                  <p>
                    Forgot password?{' '}
                    <Link href="/reset-password">
                      <a>Reset password</a>
                    </Link>
                  </p>
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
  mutation SigninMutation($login: String!, $password: String!) {
    signin(login: $login, password: $password) {
      token
      currentUser {
        id
        isActivated
      }
    }
  }
`
