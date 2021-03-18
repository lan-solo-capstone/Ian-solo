import React, {useState} from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'

const MapExp = () => {
  const [viewport, setViewport] = useState({
    latitude: 42.192324,
    longitude: -88.088098,
    width: '100vw',
    height: '100vh',
    zoom: 12,
  })

  return (
    <div className="container">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibWVsaW5kYWFybWJydXN0ZXIiLCJhIjoiY2trZTd6cHVlMDl5YzJwcXNvMWRvOHU4ciJ9.NdVU55Xhn75BzaVNjACSKQ"
        mapStyle="mapbox://styles/melindaarmbruster/ckme6qk3d0u9818l9rqsrvz27"
        onViewportChange={(viewport) => {
          setViewport(viewport)
        }}
      >
        <Marker latitude={42.20706} longitude={-88.09348}>
          <strong>
            <i className="bi bi-gift-fill text-success"></i>
          </strong>
        </Marker>

        <Marker latitude={42.19526} longitude={-88.08844}>
          <strong>
            <i className="bi bi-house-door-fill text-danger"></i>
          </strong>
        </Marker>
        <Marker latitude={42.19668} longitude={-88.11309}>
          <strong>
            <i className="bi bi-pin-fill text-primary"></i>
          </strong>
        </Marker>
      </ReactMapGL>
    </div>
  )
}

export default MapExp
