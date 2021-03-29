import React, {Component} from 'react'
import {connect} from 'react-redux'
import Talk from 'talkjs'

class InboxComponent extends Component {
  componentDidMount() {
    const currentUser = this.props.user
    console.log(currentUser)
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

        const recipient = this.props.location.item.user
        const other = new Talk.User({
          id: recipient.id,
          name: recipient.firstName,
          welcomeMessage: 'Hey there! Love to chat :-)',
        })

        // You control the ID of a conversation. oneOnOneId is a helper method that generates
        // a unique conversation ID for a given pair of users.
        const conversationId = Talk.oneOnOneId(me, other)

        const conversation = window.talkSession.getOrCreateConversation(
          conversationId
        )
        conversation.setParticipant(me)
        conversation.setParticipant(other)

        this.inbox = window.talkSession.createInbox({
          selected: conversation,
        })
        this.inbox.mount(this.container)
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

export default connect(mapState, null)(InboxComponent)
