import React, { Component } from 'react'

import Preloader from './Preloader'

interface Props {
  data: {
    name: String
    login: String
    email: String
  }
  loading: Boolean
}

class User extends Component<Props> {
  render() {
    const { data, loading } = this.props
    if (loading) return <Preloader />
    if (!data) return <h1>This user does not exist</h1>
    const { name, login: username, email } = data
    return (
      <div>
        <p>
          Name: <strong>{name}</strong>
        </p>
        <p>
          Login: <strong>{username}</strong>
        </p>
        <p>
          Email: <strong>{email}</strong>
        </p>
      </div>
    )
  }
}

export default User
