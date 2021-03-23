import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import MapSingleItem from './MapSingleItem'
import MobileFooter from './MobileFooter'

// Render functional
const SingleItemView = (props) => {
  console.log(props)
  return (
    <div className="container-fluid mb-4 p-0" style={{height: '90vh'}}>
      <div
        className="d-flex flex-column justify-content-evenly"
        style={{height: '100%'}}
      >
        <div>
          <h5 className="text-center mb-1">
            {props.location.item.itemListName}
          </h5>
          <h6 className="text-center text-secondary">
            Submitted by: {props.location.item.user.firstName}
          </h6>
        </div>

        <div
          id="itemImageIndicator"
          className="carousel slide mx-auto"
          data-bs-ride="carousel"
          style={{width: '80vw', height: '55vw'}}
        >
          <div className="carousel-indicators" style={{filter: 'invert(1)'}}>
            <button
              type="button"
              data-bs-target="#itemImageIndicator"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#itemImageIndicator"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#itemImageIndicator"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner singleViewFix">
            <div className="carousel-item singleViewFix active">
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/618F1Xwm49L._AC_SL1500_.jpg"
                className="d-block w-100 singleViewFix"
                alt="..."
              />
            </div>
            <div className="carousel-item singleViewFix">
              <img
                src="https://www.rei.com/media/bb30c1ec-44b1-437b-9ed1-b501bca2c587?size=784x588"
                className="d-block w-100 singleViewFix"
                alt="..."
              />
            </div>
            <div className="carousel-item singleViewFix">
              <img
                src="https://www.klong.com/pub_images/original/matbestick-matsked-samling.jpg"
                className="d-block w-100 singleViewFix"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#itemImageIndicator"
            data-bs-slide="prev"
            style={{filter: 'invert(1)'}}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#itemImageIndicator"
            data-bs-slide="next"
            style={{filter: 'invert(1)'}}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <a
          className="btn btn-secondary mx-auto mb-3 rounded-pill d-flex justify-content-evenly align-items-center d-md-none"
          data-bs-toggle="collapse"
          href="#mapCollapse"
          role="button"
          id="mapCollapseButton"
          style={{width: '150px', height: '30px'}}
        >
          <p className="m-0">View on map</p>
          <i
            className="bi bi-compass"
            style={{
              'font-size': '1.4rem',
              color: 'white',
            }}
          />
        </a>
        <div className="fixed-bottom d-md-none">
          <div className="collapse" id="mapCollapse">
            <a
              className="btn btn-secondary rounded-0 d-flex justify-content-center align-items-center"
              data-bs-toggle="collapse"
              href="#mapCollapse"
              role="button"
              style={{width: '100vw', height: '6vh'}}
            >
              <i
                className="bi bi-chevron-compact-up"
                id="chevron-rotate"
                style={{
                  'font-size': '2rem',
                  color: 'white',
                }}
              />
            </a>
            <div className="bg-secondary rounded-top" style={{height: '95vh'}}>
              <MapSingleItem item={props.location.item} />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-center mb-1">Description</h3>
          <p
            className="bg-secondary text-light py-3 px-4 mx-auto fs-6"
            style={{width: '80%'}}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            faucibus id dolor et posuere. Cras at egestas felis. Morbi
            scelerisque dapibus purus at accumsan. Aliquam ligula quam,
            consectetur sit amet tristique in, condimentum eu eros.
          </p>
        </div>
      </div>
    </div>
  )
}

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

export default SingleItemView
