import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

// Render functional
const SingleItem = (props) => (
  <Link
    to={{pathname: '/singleview', item: props.item}}
    className="col text-decoration-none text-secondary"
  >
    <div className="card mb-3" style={{maxwidth: '800px'}}>
      <div className="row g-0">
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          {console.log(props.item.itemPhotos)}
          <img
            className="img-fluid"
            src={
              props.item.itemPhotos[0]?.downloadURL
                ? props.item.itemPhotos[0].downloadURL
                : `../images/notFound.png`
            }
          />
        </div>
        <div className="col-md-8">
          <div className="card-body py-1" id="removeLink">
            <h5 className="card-title text-truncate">
              {props.item.itemListName}
            </h5>
            {props.item.itemType === 'Offer' ? (
              <div>
                <p className="card-text text-success my-1">Offer</p>
                <p className="card-text my-1">{props.item.status}</p>
                <p>Location</p>
              </div>
            ) : (
              <div>
                <p className="card-text text-danger my-1">Seeking</p>
                <p className="card-text my-1">{props.item.status}</p>
                <p>Location</p>
              </div>
            )}
            <p className="card-text">
              <small className="text-muted">An hour ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </Link>
)

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
