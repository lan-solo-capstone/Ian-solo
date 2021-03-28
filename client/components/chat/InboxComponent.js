import React, {Component} from 'react'
import Talk from 'talkjs'

class InboxComponent extends Component {
  // componentDidMount() {
  //   const currentUser = this.props.location.user.item

  //   Talk.ready.then(() => {
  //     var me = new Talk.User({
  //       id: currentUser.id,
  //       firstName: currentUser.firstNname,
  //       welcomeMessage: 'Hey there! How are you? :-)',
  //     })
  //   })
  // }
  // render() {
  //   return <div>TEST InboxComponent</div>
  // }
  componentDidMount() {
    const currentUser = this.props.location.item.user
    console.log(currentUser)
    // Promise can be `then`ed multiple times
    Talk.ready
      .then(() => {
        const me = new Talk.User({
          id: currentUser.id,
          name: currentUser.firstName,
          welcomeMessage: 'Hey there! How are you? :-)',
        })

        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: 't2PbbseX',
            me: me,
          })
        }

        const other = new Talk.User({
          id: '54321',
          name: 'Ronald Raygun',
          email: 'ronald@teflon.com',
          photoUrl: 'https://talkjs.com/docs/img/ronald.jpg',
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

export default InboxComponent
