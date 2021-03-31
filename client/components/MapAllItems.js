import React from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import {Link} from 'react-router-dom'
import _ from 'lodash'
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
      items: [],
    }
    window.addEventListener('resize', (e) => {
      if (!this.unload) {
        this.resizer()
      }
    })
  }

  initialViewport = {
    latitude: this.props.isLoggedIn ? +this.props.user.latitude : 40.73061,
    longitude: this.props.isLoggedIn ? +this.props.user.longitude : -73.935242,
    width: `100%`,
    height: `100%`,
    zoom: 10,
  }

  async componentDidMount() {
    if (this.props.itemsArray && this.props.itemsArray.length > 0) {
      this.setState({
        items: [
          ...this.props.itemsArray.map((item) => {
            item.user.latitude = +item.user.latitude + Math.random() / 2500
            item.user.longitude = +item.user.longitude + Math.random() / 2500
            return item
          }),
        ],
      })
    }

    const key = (await axios.get('/api/map/key')).data
    console.log(this.state.loading)
    this.setState({apiKey: key})
    this.setState({loading: false})
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.itemsArray, this.props.itemsArray)) {
      this.setState({
        items: [
          ...this.props.itemsArray.map((item) => {
            item.user.latitude = +item.user.latitude + Math.random() / 2500
            item.user.longitude = +item.user.longitude + Math.random() / 2500
            return item
          }),
        ],
      })
      this.setState({
        viewport: {...this.initialViewport},
      })
      this.setState({selectedItem: null})
    }
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
                <i className="h2 bi bi-house-door-fill text-primary"></i>
              </Marker>
            )}
            {this.state.items &&
              this.state.items.length > 0 &&
              this.state.items.map((item) => {
                return (
                  <Marker
                    key={item.id}
                    latitude={+item.user.latitude}
                    longitude={+item.user.longitude}
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
                      state: {item: this.state.selectedItem},
                    }}
                    onClick={() => {
                      this.props.unloadModal('unload')
                    }}
                  >
                    {this.state.selectedItem.itemListName}
                  </Link>
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

export default connect(mapState, null)(MapAllItems)

MapAllItems.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
  location: PropTypes.object,
}
