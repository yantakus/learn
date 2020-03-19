import React from 'react'
import { Embed } from 'semantic-ui-react'

const Youtube = ({
  id,
  className,
  ...rest
}: {
  id: string
  className?: string
}) => (
  <Embed
    className={className}
    id={id}
    active
    source="youtube"
    brandedUI={false}
    iframe={{
      src: `//www.youtube.com/embed/${id}?autohide=true&autoplay=false&color=%23444444&hq=true&jsapi=false&modestbranding=false&rel=0`,
    }}
    {...rest}
  />
)

export default Youtube
