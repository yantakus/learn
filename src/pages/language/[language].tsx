import React, { Component } from 'react'
import VideoPage from 'components/VideoPage'

interface IProps {
  router: {
    query: {
      language: string
    }
  }
}

class LanguagePage extends Component<IProps> {
  render() {
    const { language } = this.props.router.query
    return (
      <VideoPage
        type="language"
        value={language}
        where={{ language: { value: language } }}
      />
    )
  }
}

export default LanguagePage
