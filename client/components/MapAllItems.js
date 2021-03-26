import React from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import {Link} from 'react-router-dom'
/* eslint-disable complexity */

//accepts props: <MapAllItems items=objectArray>
class MapAllItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        latitude: this.props.isLoggedIn ? +this.props.user.latitude : 40.73061,
        longitude: this.props.isLoggedIn
          ? +this.props.user.longitude
          : -73.935242,
        width: `100%`,
        height: `100%`,
        zoom: 10,
      },
      loading: true,
      apiKey: '',
      selectedItem: null,
    }
    window.addEventListener('resize', (e) => {
      this.resizer()
    })
  }

  async componentDidMount() {
    const key = (await axios.get('/api/map/key')).data
    console.log(this.state.loading)
    this.setState({apiKey: key})
    this.setState({loading: false})
  }

  resizer(e) {
    const width = document.getElementById('mapContainer').offsetWidth
    const height = document.getElementById('mapContainer').offsetHeight

    console.log('running', e)

    this.setState({
      ...this.state,
      viewport: {
        ...this.state.viewport,
        width: `${width}px`,
        height: `${height}px`,
      },
    })
  }

  render() {
    return (
      <>
        {this.state.loading === true ? (
          <div>Loading...</div>
        ) : (
          <ReactMapGL
            {...this.state.viewport}
            mapboxApiAccessToken={this.state.apiKey}
            mapStyle="mapbox://styles/melindaarmbruster/ckme6qk3d0u9818l9rqsrvz27"
            onViewportChange={(viewport) => {
              this.setState({viewport: viewport})
            }}
          >
            {this.props.itemsArray &&
              this.props.itemsArray.length > 0 &&
              this.props.itemsArray.map((item) => {
                return (
                  <Marker
                    key={item.id}
                    latitude={+item.user.latitude + Math.random() / 2500}
                    longitude={+item.user.longitude + Math.random() / 2500}
                  >
                    <button
                      className="btn btn-link text-center text-decoration-none"
                      onClick={(evt) => {
                        evt.preventDefault()
                        this.setState({selectedItem: item})
                      }}
                      type="button"
                    >
                      {item.itemType === 'Offer' ? (
                        <i className="h2 bi bi-pin-fill text-success"></i>
                      ) : (
                        <i className="h2 bi bi-pin-fill text-danger"></i>
                      )}
                    </button>
                  </Marker>
                )
              })}
            {this.state.selectedItem ? (
              <Popup
                latitude={+this.state.selectedItem.user.latitude}
                longitude={+this.state.selectedItem.user.longitude}
                closeOnClick={false}
                onClose={() => {
                  this.setState({selectedItem: null})
                }}
              >
                <div
                  className="text-center"
                  style={{width: '150px', height: 'auto'}}
                >
                  <div>
                    {this.state.selectedItem.itemPhotos.length > 0 &&
                    this.state.selectedItem.itemPhotos[0].downloadURL ? (
                      <img
                        width="100%"
                        src={this.state.selectedItem.itemPhotos[0].downloadURL}
                      />
                    ) : (
                      <img width="100%" src="/images/croppedFsDefault.jpg" />
                    )}
                  </div>

                  <Link
                    className="text-center text-decoration-none text-primary m-0"
                    to={{
                      pathname: '/singleview',
                      item: this.state.selectedItem,
                    }}
                  >
                    {this.state.selectedItem.itemListName}
                  </Link>
                </div>
              </Popup>
            ) : null}

            {this.props.isLoggedIn && (
              <Marker
                latitude={+this.props.user.latitude}
                longitude={+this.props.user.longitude}
              >
                <i className="h2 bi bi-house-door-fill text-primary"></i>
              </Marker>
            )}
          </ReactMapGL>
        )}
      </>
    )
  }
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
