import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import timeAgo from 'node-time-ago'

// Render functional
const SingleItem = (props) => {
  const {item} = props

  const {createdAt, city, state} = item.user

  return (
    <Link
      to={{pathname: '/singleview', item: item}}
      className="col text-decoration-none text-secondary"
    >
      <div className="card mb-3" style={{maxwidth: '800px'}}>
        <div className="row g-0">
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            {console.log(item.itemPhotos)}
            <img
              className="img-fluid"
              src={
                item.itemPhotos[0]?.downloadURL
                  ? item.itemPhotos[0].downloadURL
                  : `../images/notFound.png`
              }
            />
          </div>
          <div className="col-md-8">
            <div className="card-body py-1" id="removeLink">
              <h5 className="card-title text-truncate">{item.itemListName}</h5>
              <div>
                {item.itemType === 'Offer' ? (
                  <p className="card-text text-success my-1">Offer</p>
                ) : (
                  <p className="card-text text-danger my-1">Seeking</p>
                )}
                <p className="card-text my-1">{item.status}</p>
                <p>
                  {city}, {state}
                </p>
              </div>
              <p className="card-text">
                <small className="text-muted">{timeAgo(createdAt)}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SingleItem

// Render Class
// class Placeholder extends React.Component{
//   render(){return (<div></div>)}
// }

/**
 * CONTAINER
 */

// const mapState = (state) => ({
//   placeholder: state.placeholder,
// })

// const mapDispatch = (dispatch) => ({
//   placeholder: () => {
//     dispatch(placeholder())
//   },
// })

// export default connect()()

SingleItem.propTypes = {
  itemListName: PropTypes.string,
  itemType: PropTypes.string,
}
