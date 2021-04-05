import React, {Component} from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'

//accepts props: item=object <MapSingleItem item=object>
class MapSingleItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        latitude: this.props.item ? +this.props.item.user.latitude : 40.73061,
        longitude: this.props.item
          ? +this.props.item.user.longitude
          : -73.935242,
        width: '100%',
        height: '100%',
        zoom: 10,
      },
      loading: true,
      apiKey: '',
      selectedItem: this.props.item,
    }
    window.addEventListener('resize', (e) => {
      if (!this.unload) {
        this.resizer()
      }
    })
  }

  async componentDidMount() {
    const key = (await axios.get('/api/map/key')).data
    this.setState({apiKey: key})
    this.setState({loading: false})
  }

  componentWillUnmount() {
    this.unload = true
  }

  resizer(e) {
    if (this.props?.prevRef?.current?.offsetHeight !== 0) {
      const width = this.props.prevRef?.current?.offsetWidth
      const height = this.props.prevRef?.current?.offsetHeight

      this.setState({
        ...this.state,
        viewport: {
          ...this.state.viewport,
          width: `${width}px`,
          height: `${height}px`,
        },
      })
    } else {
      this.setState({
        ...this.state,
        viewport: {
          ...this.state.viewport,
          width: `100%`,
          height: `100%`,
        },
      })
    }
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
            {this.props.isLoggedIn && (
              <Marker
                latitude={+this.props.user.latitude}
                longitude={+this.props.user.longitude}
              >
                <i className="h1 bi bi-house-door-fill text-primary"></i>
              </Marker>
            )}
            {this.props.item && (
              <Marker
                latitude={+this.props.item.user.latitude}
                longitude={+this.props.item.user.longitude}
              >
                <button
                  className="btn btn-link text-center text-decoration-none"
                  onClick={(evt) => {
                    evt.preventDefault()
                    this.setState({selectedItem: this.props.item})
                  }}
                  type="button"
                >
                  {this.props.item.itemType === 'Offer' ? (
                    <i className="h1 bi bi-pin-fill text-success"></i>
                  ) : (
                    <i className="h1 bi bi-pin-fill text-danger"></i>
                  )}
                </button>
              </Marker>
            )}
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

                  {this.state.selectedItem.itemListName}
                </div>
              </Popup>
            ) : null}
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

export default connect(mapState, null)(MapSingleItem)

MapSingleItem.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
  location: PropTypes.object,
}
