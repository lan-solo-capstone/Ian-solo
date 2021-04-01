import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers, removeExistingUser} from '../store/users.js'
import {fetchAllItems, allItemsUnload} from '../store/items'
import {me} from '../store/user.js'
import {UserView} from './index.js'
import SingleItem from './SingleItem'
import {Link} from 'react-router-dom'

class AllUsers extends Component {
  // need to fetch all the users
  // need to fetch the current logged in user to later check if admin
  componentDidMount() {
    this.props.fetchUsers()
    this.props.fetchUser()
    this.props.fetchAllItems()
  }

  // need this logic in case we refresh the page we're on,
  // which would necessitate reloading the user in componentDidMount
  // i.e., we may not have the rights to get all users yet
  // until the logged in user is successfully loaded

  componentDidUpdate(prevProps) {
    if (!prevProps.user.id && this.props.user.id) {
      this.props.fetchUsers()
    }
  }

  componentWillUnmount() {
    this.props.allItemsUnload()
  }

  render() {
    // if not an admin, display this
    if (!this.props.user.admin) {
      return (
        <>
          <div className="container-sm d-flex justify-content-center align-items-center flex-column my-4">
            <h5>403</h5>
            <h4>Page is forbidden</h4>
            <img src="https://http.cat/403" className="w-100" />
          </div>
        </>
      )
    }
    console.log('in render this.props', this.props)
    if (this.props.users.length === 0) {
      return <div>Loading, or we have no users =(</div>
    }

    const {users} = this.props || []

    // sort fetched users by lastName
    const sortedUsers = users.sort((a, b) => {
      const nameA = a.lastName.toUpperCase()
      const nameB = b.lastName.toUpperCase()
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })

    return this.props.loading ? (
      <div
        className="spinner-border position-absolute top-50 start-50 translate-middle"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    ) : (
      <div className="container mt-3" style={{marginBottom: '65px'}}>
        {console.log(this.props.items)}
        <div className="row row-cols-1 row-cols-md-2">
          <div className="col">
            <div className="bg-secondary border rounded d-flex justify-content-center mb-3 p-1">
              <a
                className="btn bg-light py-2 rounded-top text-secondary text-center"
                style={{width: '98%'}}
                data-bs-toggle="collapse"
                href="#multiCollapseClosed"
                aria-expanded="true"
                aria-controls="multiCollapseClosed"
                role="button"
              >
                <h4 className="m-0">Users </h4>
                <i
                  className="bi bi-chevron-compact-down text-secondary"
                  style={{
                    fontSize: '2rem',
                  }}
                />
              </a>
              <div
                className="collapse multi-collapse p-1"
                id="multiCollapseClosed"
              >
                <div className="row row-cols-1 row-cols-md-2 gy-4">
                  {sortedUsers.map((user) => {
                    return (
                      <div key={user.id} className="col">
                        <div className="card">
                          <Link
                            to={`/users/${user.id}`}
                            className="text-decoration-none"
                          >
                            <UserView user={user} />
                          </Link>
                        </div>
                        {this.props.user.id !== user.id ? (
                          <button
                            type="button"
                            onClick={() =>
                              this.props.removeExistingUser(user.id)
                            }
                            className="btn btn-danger rounded-0 mt-1"
                          >
                            Delete User
                          </button>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="bg-secondary border rounded d-flex justify-content-center mb-3">
              <a
                className="btn m-1 bg-light py-2 rounded-top text-secondary text-center"
                style={{width: '98%'}}
                data-bs-toggle="collapse"
                href="#multiCollapseOpen"
                aria-expanded="true"
                aria-controls="multiCollapseOpen"
                role="button"
              >
                <h4 className="m-0">User Items </h4>
                <i
                  className="bi bi-chevron-compact-down text-secondary"
                  style={{
                    fontSize: '2rem',
                  }}
                />
              </a>
              <div
                className="collapse multi-collapse"
                id="multiCollapseOpen"
                style={{maxWidth: '75%'}}
              >
                <div className="row gx-2 p-2 row-cols-1 row-cols-md-2">
                  {this.props.items.map((item) => (
                    <SingleItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    user: state.user,
    items: state.items.items,
    loading: state.items.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    removeExistingUser: (userId) => dispatch(removeExistingUser(userId)),
    fetchUser: () => dispatch(me()),
    fetchAllItems: () => dispatch(fetchAllItems()),
    allItemsUnload: () => dispatch(allItemsUnload()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
