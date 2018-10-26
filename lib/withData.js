import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'

/* const restLink = new RestLink({
  uri: `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${
    process.env['YOUTUBE_API_KEY']
  }`,
}) */

function createClient({ headers }) {
  return new ApolloClient({
    uri: 'http://localhost:4000',
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      })
    },
  })
}

export default withApollo(createClient)
