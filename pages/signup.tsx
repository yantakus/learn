import React, { Component } from 'react'
import Link from 'next/link'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Router from 'next/router'
import cookie from 'cookie'

import { Form, Message } from 'semantic-ui-react'
import { userQuery } from '../components/Menu'

export default class SignUp extends Component {
  state = { name: '', email: '', login: '', password: '' }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  render() {
    const { name, email, password, login } = this.state
    return (
      <Mutation
        mutation={mutation}
        update={(
          store,
          {
            data: {
              signup: { token, currentUser },
            },
          }
        ) => {
          document.cookie = cookie.serialize('token', token, {
            maxAge: 30 * 24 * 60 * 60, // 30 days
          })
          store.writeQuery({
            query: userQuery,
            data: { currentUser },
          })
          Router.replace('/')
        }}
      >
        {(signup, { loading, error }) => (
          <div className="ui stackable three column centered grid container">
            <div className="column">
              <h3 className="ui horizontal divider header">Sign Up</h3>
              <Form
                onSubmit={() =>
                  signup({ variables: { name, email, login, password } })
                }
                error={Boolean(error)}
              >
                <div className="field">
                  <label>Name</label>
                  <Form.Input
                    type="text"
                    name="name"
                    value={name}
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field">
                  <label>Login</label>
                  <Form.Input
                    type="text"
                    name="login"
                    value={login}
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field">
                  <label>Email address</label>
                  <Form.Input
                    type="email"
                    name="email"
                    value={email}
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
                <Form.Button loading={loading} primary content="Sign Up" />
                <Message error content={String(error)} />
              </Form>
              <div className="ui divider" />
              <div className="ui column grid">
                <div className="center aligned column">
                  Already got an account?{' '}
                  <Link href="/signin">
                    <a>Sign In</a>
                  </Link>
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
  mutation SignupMutation(
    $name: String!
    $email: String!
    $login: String!
    $password: String!
  ) {
    signup(name: $name, email: $email, login: $login, password: $password) {
      token
      currentUser {
        id
      }
    }
  }
`
