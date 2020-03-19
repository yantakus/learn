import React from 'react'

import User from './User'
import Signin from './Signin'

interface IProps {
  returnUser?: boolean // return function and pass user as parameter
  children: any
}

const Private = ({ returnUser, children }: IProps) => (
  <User>
    {(user, loading) => {
      if (loading) return <p>Loading...</p>
      if (!user) {
        return (
          <div>
            <h3 className="text-center mb-10">
              Please Sign In before Continuing
            </h3>
            <Signin />
          </div>
        )
      }
      if (returnUser) {
        return children(user, loading)
      } else {
        return children
      }
    }}
  </User>
)

export default Private
