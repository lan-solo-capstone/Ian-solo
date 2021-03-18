import React, {useState} from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'
import {connect} from 'react-redux'

//accepts props: <MapAllItems items=objectArray>
const MapAllItems = (props) => {
  const [viewport, setViewport] = useState({
    latitude: 40.73061,
    longitude: -73.935242,
    width: '100vw',
    height: '100vh',
    zoom: 11,
  })

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibWVsaW5kYWFybWJydXN0ZXIiLCJhIjoiY2trZTd6cHVlMDl5YzJwcXNvMWRvOHU4ciJ9.NdVU55Xhn75BzaVNjACSKQ"
        mapStyle="mapbox://styles/melindaarmbruster/ckme6qk3d0u9818l9rqsrvz27"
        onViewportChange={(viewport) => {
          setViewport(viewport)
        }}
      >
        {props.location.itemsArray &&
          props.location.itemsArray.length > 0 &&
          props.location.itemsArray.map((item) => {
            return (
              <Marker
                // key={item.id}
                latitude={item.user.geoLocation.coordinates[0]}
                longitude={item.user.geoLocation.coordinates[1]}
              >
                <strong>
                  <i className="bi bi-pin-fill text-success"></i>
                </strong>
              </Marker>
            )
          })}

        {props.isLoggedIn && (
          <Marker
            latitude={props.user.geoLocation.coordinates[0]}
            longitude={props.user.geoLocation.coordinates[1]}
          >
            <strong>
              <i className="bi bi-house-door-fill text-danger"></i>
            </strong>
          </Marker>
        )}
      </ReactMapGL>
    </div>
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
