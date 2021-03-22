import React, {useState} from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
/* eslint-disable complexity */

//accepts props: <MapAllItems items=objectArray>
const MapAllItems = (props) => {
  const [viewport, setViewport] = useState({
    latitude: props.isLoggedIn ? +props.user.latitude : 40.73061,
    longitude: props.isLoggedIn ? +props.user.longitude : -73.935242,
    width: props.width ? props.width : '100%',
    height: props.height ? props.height : '100%',
    zoom: 10,
  })

  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoibWVsaW5kYWFybWJydXN0ZXIiLCJhIjoiY2trZTd6cHVlMDl5YzJwcXNvMWRvOHU4ciJ9.NdVU55Xhn75BzaVNjACSKQ"
      mapStyle="mapbox://styles/melindaarmbruster/ckme6qk3d0u9818l9rqsrvz27"
      onViewportChange={(viewport) => {
        setViewport(viewport)
      }}
    >
      {props.itemsArray &&
        props.itemsArray.length > 0 &&
        props.itemsArray.map((item) => {
          return (
            <Marker
              key={item.id}
              latitude={+item.user.latitude}
              longitude={+item.user.longitude}
            >
              <button
                onClick={(evt) => {
                  evt.preventDefault()
                  setSelectedItem(item)
                }}
              >
                <strong>
                  <i className="bi bi-pin-fill text-success"></i>
                </strong>
              </button>
            </Marker>
          )
        })}
      {selectedItem ? (
        <Popup
          latitude={+selectedItem.user.latitude}
          longitude={+selectedItem.user.longitude}
          onClose={() => {
            setSelectedItem(null)
          }}
        >
          {/* just a test route for now */}
          <a href="https://google.com" className="text-primary">
            {selectedItem.itemListName}
          </a>
        </Popup>
      ) : null}

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

export default connect(mapState, null)(MapAllItems)

MapAllItems.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
  location: PropTypes.object,
}
