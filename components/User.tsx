import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

import { VIDEO } from './Videos/Item'

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      name
      login
      email
      role
      rank
      videosAdded ${VIDEO}
      videosBookmarked ${VIDEO}
    }
  }
`

interface IProps {
  children?: Function
  nullable?: boolean // return null if there's no user
}

const User = ({ children, nullable, ...rest }: IProps) => (
  <Query {...rest} query={CURRENT_USER_QUERY}>
    {({ data: { me }, loading }) => {
      if (nullable) {
        if (me) {
          return children(me, loading)
        } else {
          return null
        }
      } else {
        return children(me, loading)
      }
    }}
  </Query>
)

export default User
