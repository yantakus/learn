import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'
import Link from 'next/link'
import { Grid, Segment } from 'semantic-ui-react'
import Router from 'next/router'
import NProgress from 'nprogress'

import withData from '../lib/withData.js'

import Main from '../components/Main'
import Menu from '../components/Menu'
import Head from '../components/Head'

Router.onRouteChangeStart = () => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

interface Props {
  apollo: ApolloClient<{}>
  loggedInUser?: Object
  query: Object
  router: {
    pathname: String
    asPath: String
  }
}

interface State {
  hasError: boolean
}

class MyApp extends App<Props> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  componentDidCatch() {
    this.setState({ hasError: true })
  }
  render() {
    const { Component, apollo, router } = this.props
    const { hasError } = this.state as State
    if (hasError) {
      return <h1>Something went wrong.</h1>
    }
    return (
      <Container>
        <Head title="With apollo app" />
        <ApolloProvider client={apollo}>
          <Main>
            <div className="ui stackable relaxed container">
              <div className="header item">
                <h1>
                  <Link href="/">
                    <a className="navbar-item">Learn</a>
                  </Link>
                </h1>
              </div>
              <Grid>
                <Grid.Column stretched width={12}>
                  <Segment stacked>
                    <Component router={router} />
                  </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Menu router={router} />
                </Grid.Column>
              </Grid>
            </div>
          </Main>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withData(MyApp)
