import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Profile extends Component {
  render() {
    const { data } = this.props
    if (!data) {
      return null
    }
    return (
      <div>
        {data.avatar_url && <img src={data.avatar_url} />}
        {data.id &&
          <p>
            id: {data.id}
          </p>}
        {data.name &&
          <p>
            name: {data.name}
          </p>}
        {data.email &&
          <p>
            email: {data.email}
          </p>}
        {data.public_repos > 0 &&
          <p>
            repos: {data.public_repos}
          </p>}
        {data.blog &&
          <p>
            blog: <a href={data.blog}>{data.blog}</a>
          </p>}
      </div>
    )
  }
}

Profile.propTypes = {
  data: PropTypes.object,
}
