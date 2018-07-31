import React, { Component } from 'react'
import Link from 'next/link'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Router from 'next/router'
import cookie from 'cookie'

import { Form, Message } from 'semantic-ui-react'
import { userQuery } from '../components/Menu'

export default class SignUp extends Component {
  state = { name: '', email: '', password: '' }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  render() {
    const { name, email, password } = this.state
    return (
      <Mutation
        mutation={mutation}
        variables={{
          name,
          email,
          password
        }}
        update={(store, { data: { signup: { token, user }} }) => {
          document.cookie = cookie.serialize('token', token, {
            maxAge: 30 * 24 * 60 * 60 // 30 days
          })
          store.writeQuery({
            query: userQuery,
            data: { user }
          })
          Router.replace('/')
        }}
      >
        {(signup, { loading, error }) => (
          <div className="ui stackable three column centered grid container">
            <div className="column">
              <h3 className="ui horizontal divider header">Sign Up</h3>
              <Form onSubmit={() => signup({ name, email, password })} error={Boolean(error)}>
                <div className="field">
                  <label>Name</label>
                  <Form.Input type="text" name="name" value={name} required onChange={this.handleChange} />
                </div>
                <div className="field">
                  <label>Email address</label>
                  <Form.Input type="email" name="email" value={email} required onChange={this.handleChange} />
                </div>
                <div className="field">
                  <label>Password</label>
                  <Form.Input type="password" name="password" value={password} required onChange={this.handleChange} />
                </div>
                <Form.Button loading={loading} primary content="Sign Up" />
                <Message
                  error
                  content={String(error)}
                />
              </Form>
              <div className="ui divider"></div>
              <div className="ui column grid">
                <div className="center aligned column">
                  Already got an account? <Link href="/login"><a>Log In</a></Link>
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
  mutation SignupMutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`
