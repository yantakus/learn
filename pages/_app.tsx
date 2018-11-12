import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'
import Link from 'next/link'
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
                <h1 className="mb-8">
                  <Link href="/">
                    <a className="navbar-item">Learn</a>
                  </Link>
                </h1>
              </div>
              <div className="flex -mx-4">
                <div className="flex-1 px-4">
                  <Component router={router} />
                </div>
                <div className="flex-initial px-4">
                  <Menu router={router} />
                </div>
              </div>
            </div>
          </Main>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withData(MyApp)
