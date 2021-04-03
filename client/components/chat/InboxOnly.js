import React, {Component} from 'react'
import {connect} from 'react-redux'
import Talk from 'talkjs'

class InboxOnly extends Component {
  componentDidMount() {
    const currentUser = this.props.user
    Talk.ready
      .then(() => {
        const me = new Talk.User({
          id: currentUser.id,
          name: currentUser.firstName,
        })

        window.talkSession = new Talk.Session({
          appId: 't2PbbseX',
          me: me,
        })

        // create the inbox of all messages received/sent previously
        const inbox = window.talkSession.createInbox()
        inbox.mount(this.container)
      })
      .catch((e) => console.error(e))
  }

  componentWillUnmount() {
    if (this.inbox) {
      this.inbox.destroy()
    }
  }

  render() {
    return (
      <span>
        <div className="mt-3">
          <div style={{height: '500px'}} ref={(c) => (this.container = c)}>
            Loading...
          </div>
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
