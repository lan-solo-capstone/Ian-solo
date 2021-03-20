import React, {useState} from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

//accepts props: item=object <MapSingleItem item=object>
const MapSingleItem = (props) => {
  const [viewport, setViewport] = useState({
    latitude: props.item ? +props.item.user.latitude : 40.73061,
    longitude: props.item ? +props.item.user.longitude : -73.935242,
    width: props.width ? props.width : '100%',
    height: props.height ? props.height : '100%',
    zoom: 10,
  })

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoibWVsaW5kYWFybWJydXN0ZXIiLCJhIjoiY2trZTd6cHVlMDl5YzJwcXNvMWRvOHU4ciJ9.NdVU55Xhn75BzaVNjACSKQ"
      mapStyle="mapbox://styles/melindaarmbruster/ckme6qk3d0u9818l9rqsrvz27"
      onViewportChange={(viewport) => {
        setViewport(viewport)
      }}
    >
      {props.item && (
        <Marker
          latitude={+props.item.user.latitude}
          longitude={+props.item.user.longitude}
        >
          <strong>
            <i className="bi bi-pin-fill text-success"></i>
          </strong>
        </Marker>
      )}

      {props.isLoggedIn && (
        <Marker
          latitude={+props.user.latitude}
          longitude={+props.user.longitude}
        >
          <strong>
            <i className="bi bi-house-door-fill text-danger"></i>
          </strong>
        </Marker>
      )}
    </ReactMapGL>
  )
}

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user,
  }
}

export default connect(mapState, null)(MapSingleItem)

MapSingleItem.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
  location: PropTypes.object,
}
