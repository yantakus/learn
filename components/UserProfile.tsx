import React, { Component } from 'react'

import Preloader from './Preloader'

interface Props {
  data: {
    name: string
    login: string
    email: string
    rank: string
  }
  loading: boolean
}

class User extends Component<Props> {
  render() {
    const { data, loading } = this.props
    if (loading) return <Preloader />
    if (!data) return <h1>This user does not exist</h1>
    const { name, login: username, email, rank } = data
    return (
      <div>
        <p className="mb-4">
          <strong>Rank:</strong> <strong>{rank}</strong>
        </p>
        <p>
          Name: <strong>{name}</strong>
        </p>
        <p>
          Login: <strong>{username}</strong>
        </p>
        {email && (
          <p>
            Email: <strong>{email}</strong>
          </p>
        )}
      </div>
    )
  }
}

export default User
