import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    const { children } = this.props
    return (
      <div>
        {children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.any.isRequired,
}

const mapStateToProps = state => ({
  users: state.users,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(App)
