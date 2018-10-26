import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Menu } from 'semantic-ui-react'
import Link from 'next/link'

import { CURRENT_USER_QUERY } from '../components/User'
import User from '../components/User'

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`

interface Props {
  router: {
    pathname: String
    asPath: String
  }
}

const defaultMenuItems = [{ name: 'All Videos', url: '/' }]
let menuItems

export default class MenuComponent extends Component<Props> {
  render() {
    const {
      router: { pathname },
    } = this.props
    return (
      <User>
        {({ data }) => {
          const user = data && data.me
          if (user) {
            menuItems = [
              ...defaultMenuItems,
              {
                name: 'My Profile',
                url: '/me',
              },
              {
                name: 'My Videos',
                url: '/my-videos',
              },
              {
                name: 'Bookmarked Videos',
                url: '/bookmarked-videos',
              },
              {
                name: 'Add Video',
                url: '/add',
              },
            ]
          } else {
            menuItems = [
              ...defaultMenuItems,
              {
                name: 'Sign In',
                url: `/signin`,
              },
              {
                name: 'Sign Up',
                url: '/signup',
              },
            ]
          }
          return (
            <Mutation
              mutation={SIGN_OUT_MUTATION}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {signout => (
                <Menu fluid vertical tabular="right">
                  {menuItems.map(i => (
                    <Menu.Item
                      key={i.name}
                      name={i.name}
                      active={
                        pathname === i.url || pathname.startsWith(`${i.url}/`)
                      }
                    >
                      <Link prefetch href={i.url}>
                        <a>{i.name}</a>
                      </Link>
                    </Menu.Item>
                  ))}
                  {user && (
                    <Menu.Item key="Sign Out">
                      <a
                        onClick={() => signout()}
                        style={{ cursor: 'pointer' }}
                      >
                        Sign Out
                      </a>
                    </Menu.Item>
                  )}
                </Menu>
              )}
            </Mutation>
          )
        }}
      </User>
    )
  }
}
