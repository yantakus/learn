import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import PropTypes from 'prop-types'

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      name
      login
      email
      videosAdded {
        ytId
      }
    }
  }
`

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
)

User.propTypes = {
  children: PropTypes.func.isRequired,
}

export default User
export { CURRENT_USER_QUERY }
