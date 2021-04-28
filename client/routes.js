import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  MapAllItems,
  MapSingleItem,
  NewItemForm,
  Items,
  SingleItemView,
  AllUsers,
  User,
  InboxComponent,
  InboxOnly,
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/items" component={Items} />
        <Route path="/mapallitems" component={MapAllItems} />
        <Route path="/mapsingleitem" component={MapSingleItem} />
        <Route path="/singleview" component={SingleItemView} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/">
              <Redirect to="/items" />
            </Route>
            <Route path="/useraccount" component={UserHome} />
            <Route path="/post" component={NewItemForm} />
            <Route exact path="/users" component={AllUsers} />
            <Route exact path="/users/:userId" component={User} />
            <Route exact path="/messages" component={InboxComponent} />
            <Route exact path="/messages/all" component={InboxOnly} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
