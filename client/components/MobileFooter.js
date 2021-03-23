import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

// Render functional
const MobileFooter = (props) => (
  <div className="row cols-3 gx-2 bg-secondary">
    <div className="col text-center">
      <Link to="/items" className="text-decoration-none m-0">
        <i
          className="bi bi-house text-white"
          style={{
            'font-size': '1.8rem',
          }}
        ></i>
      </Link>
    </div>
    <div className="col text-center">
      <Link to="/post" className="text-decoration-none m-0">
        <i
          className="bi bi-upload text-white"
          style={{
            'font-size': '1.8rem',
          }}
        ></i>
      </Link>
    </div>
    <div className="col text-center">
      <Link to="/home" className="text-decoration-none m-0">
        <i
          className="bi bi-person-circle text-white"
          style={{
            'font-size': '1.8rem',
          }}
        ></i>
      </Link>
    </div>
  </div>
)

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

export default MobileFooter
