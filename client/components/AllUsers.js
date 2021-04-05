import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {fetchUsers, removeExistingUser} from '../store/users'
import {
  fetchAllItems,
  allItemsUnload,
  deleteSingleItemRoute,
} from '../store/items'
import {UserView, SingleItem} from '../components'
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
    const userIsAdmin = this.props.user.admin
    const {loading, items} = this.props
    const {users} = this.props || []

    // if not an admin, display this
    if (!userIsAdmin) {
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

    // if waiting for data to load, display loading message
    if (loading) {
      return (
        <div
          className="spinner-border position-absolute top-50 start-50 translate-middle"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )

      // users is deconstructed from props
    } else if (users.length === 0) {
      return <div>No users found.</div>
    }

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

    // items is deconstructed from props
    const sortedItems = items.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

    return (
      <div className="container mt-3" style={{marginBottom: '65px'}}>
        <div className="row gx-2 row-cols-1 row-cols-md-2 text-secondary mt-3">
          <div className="col text-light">
            <div className="mx-auto">
              <a
                className="btn btn-secondary m-1 bg-light py-2 text-secondary text-center"
                style={{width: '98%'}}
                data-bs-toggle="collapse"
                href="#multiCollapseUsers"
                aria-expanded="true"
                aria-controls="multiCollapseUsers"
                role="button"
              >
                <h4 className="m-0">View Users</h4>
                <i
                  className="bi bi-chevron-compact-down text-secondary"
                  style={{
                    fontSize: '2rem',
                  }}
                />
              </a>
              <div
                className="collapse multi-collapse rounded bg-secondary"
                id="multiCollapseUsers"
              >
                <div className="row gx-2 p-2 row-cols-1 row-cols-md-2">
                  {sortedUsers.map((user) => {
                    return (
                      <div key={user.id} className="col mb-3">
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
                            className="btn btn-danger rounded-0 my-1"
                          >
                            Delete User
                          </button>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
                <a
                  className="btn btn-secondary m-1 bg-light py-2 text-secondary text-center"
                  style={{width: '98%'}}
                  data-bs-toggle="collapse"
                  href="#multiCollapseUsers"
                  aria-expanded="true"
                  aria-controls="multiCollapseUsers"
                  role="button"
                >
                  <div className="m-0 fs-5">Collapse</div>
                  <i
                    className="bi bi-chevron-compact-up text-secondary"
                    style={{
                      fontSize: '1.5rem',
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="col text-light">
            <div className="mx-auto">
              <a
                className="btn btn-secondary m-1 bg-light py-2 text-secondary text-center"
                style={{width: '98%'}}
                data-bs-toggle="collapse"
                href="#multiCollapsePost"
                aria-expanded="true"
                aria-controls="multiCollapsePost"
                role="button"
              >
                <h4 className="m-0">View Posts</h4>
                <i
                  className="bi bi-chevron-compact-down text-secondary"
                  style={{
                    fontSize: '2rem',
                  }}
                />
              </a>
              <div
                className="collapse multi-collapse rounded bg-secondary"
                id="multiCollapsePost"
              >
                <div className="row gx-2 p-2 row-cols-1 row-cols-md-2">
                  {sortedItems.map((item) => (
                    <div key={item.id}>
                      <SingleItem item={item} />
                      <button
                        type="button"
                        className="btn btn-danger rounded-0 mt-1 mb-3"
                        onClick={() => {
                          this.props.deleteSingleItemRoute(item.id)
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
                <a
                  className="btn btn-secondary m-1 bg-light py-2 text-secondary text-center"
                  style={{width: '98%'}}
                  data-bs-toggle="collapse"
                  href="#multiCollapsePost"
                  aria-expanded="true"
                  aria-controls="multiCollapsePost"
                  role="button"
                >
                  <div className="m-0 fs-5">Collapse</div>
                  <i
                    className="bi bi-chevron-compact-up text-secondary"
                    style={{
                      fontSize: '1.5rem',
                    }}
                  />
                </a>
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
    deleteSingleItemRoute: (itemId) => dispatch(deleteSingleItemRoute(itemId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
