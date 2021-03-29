import React, {Component} from 'react'
import {connect} from 'react-redux'
import history from './../history'

const adminButton = (props) => {
  console.log('props', props.user.admin)
  return (
    <div>
      {props.user.admin ? (
        <button onClick={() => history.push('/users')}>admin home</button>
      ) : null}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(adminButton)
