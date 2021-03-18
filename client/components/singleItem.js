import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

// Render functional
const singleItem = (props) => (
  <div className="col singleItem p-0 d-flex bg-secondary text-white border border-dark overflow-hidden">
    <img
      src="https://media.tiffany.com/is/image/Tiffany/EcomItemL2/audubonafternoon-tea-spoon-10486688_992339_ED.jpg"
      className="singleItemImg"
    />

    <div className="singleItemInfo d-flex flex-column justify-content-evenly ms-3">
      <div>{props.itemType}</div>
      <p className="text-nowrap mb-0">{props.itemListName}</p>
      <div>Location</div>
      <div>An hour ago</div>
    </div>
  </div>
)

export default singleItem

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
