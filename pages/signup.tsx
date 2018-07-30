import React, { Component } from 'react'
import Link from 'next/link'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'
import Router from 'next/router'
import { Form } from 'semantic-ui-react'

class SignUp extends Component {
  state = { name: '', email: '', password: '' }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    const { name, email, password } = this.state
    this.props.signup(name, email, password)
  }

  render() {
    const { name, email, password } = this.state
    return (
      <div className="ui stackable three column centered grid container">
        <div className="column">
          <h3 className="ui horizontal divider header">Sign Up</h3>
          <Form onSubmit={this.handleSubmit}>
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
            <Form.Button primary content="Sign Up" />
          </Form>
          <div className="ui divider"></div>
          <div className="ui column grid">
            <div className="center aligned column">
              Already got an account? <Link href="/login">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const signupMutation = gql`
  mutation SignupMutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`

export default graphql(signupMutation, {
  props: ({ mutate }) => ({
    signup: (name, email, password) =>
      mutate({
        variables: {
          name,
          email,
          password
        }
      })
      .then(response => {
        localStorage.setItem('USER_TOKEN', response.data.signup.token)
        // redirect to login page
        Router.replace('/')
      })
      .catch(error => console.error(error))
  })
})(SignUp)
