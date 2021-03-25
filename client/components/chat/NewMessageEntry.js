import React, {Component} from 'react'
import {sendMessage} from '../../store/chat'
import {me} from '../../store/user.js'
import {connect} from 'react-redux'

export class NewMessageEntry extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const message = event.target.content.value
    this.props.submitMessage({
      content: message,
      // channelId: this.props.channelId,
      channelId: 1,
      userId: 3,
    })
  }

  render() {
    console.log('in NewMessageEntry render, this.props', this.props)
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">
              Chat!
            </button>
          </span>
        </div>
      </form>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatch = (dispatch) => ({
  fetchUser: () => dispatch(me()),
  submitMessage: (message) => dispatch(sendMessage(message)),
})

export default connect(mapState, mapDispatch)(NewMessageEntry)
