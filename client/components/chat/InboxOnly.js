import React, {Component} from 'react'
import {connect} from 'react-redux'
import Talk from 'talkjs'

class InboxOnly extends Component {
  componentDidMount() {
    const currentUser = this.props.user
    console.log(currentUser)
    // Promise can be `then`ed multiple times
    Talk.ready
      .then(() => {
        const me = new Talk.User({
          id: currentUser.id,
          name: currentUser.firstName,
        })

        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: 't2PbbseX',
            me: me,
          })
        }

        // // You control the ID of a conversation. oneOnOneId is a helper method that generates
        // // a unique conversation ID for a given pair of users.
        // const conversationId = Talk.oneOnOneId(me, other)

        // const conversation = window.talkSession.getOrCreateConversation(
        //   conversationId
        // )
        // conversation.setParticipant(me)
        // conversation.setParticipant(other)

        const inbox = window.talkSession.createInbox()
        inbox.mount(document.getElementById('inbox-container'))
      })
      .catch((e) => console.error(e))
  }

  componentWillUnmount() {
    if (this.inbox) {
      this.inbox.destroy()
    }
  }

  render() {
    console.log('in InboxContainer render, props', this.props)
    return (
      <span>
        <div style={{height: '500px'}} ref={(c) => (this.container = c)}>
          Loading...
        </div>
      </span>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapState, null)(InboxOnly)
