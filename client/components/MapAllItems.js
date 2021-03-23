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
        width: this.props.width ? this.props.width : '100%',
        height: this.props.height ? this.props.height : '100%',
        zoom: 10,
      },
      loading: true,
      apiKey: '',
      selectedItem: null,
    }
  }

  async componentDidMount() {
    const key = (await axios.get('/api/map/key')).data
    console.log(this.state.loading)
    this.setState({apiKey: key})
    this.setState({loading: false})
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
                    latitude={+item.user.latitude}
                    longitude={+item.user.longitude}
                  >
                    <button
                      onClick={(evt) => {
                        evt.preventDefault()
                        this.setState({selectedItem: item})
                      }}
                      type="button"
                    >
                      <strong>
                        <i className="bi bi-pin-fill text-success"></i>
                      </strong>
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
                <Link
                  to={{pathname: '/singleview', item: this.state.selectedItem}}
                  className=""
                >
                  {this.state.selectedItem.itemListName}
                </Link>
              </Popup>
            ) : null}

            {this.props.isLoggedIn && (
              <Marker
                latitude={+this.props.user.latitude}
                longitude={+this.props.user.longitude}
              >
                <strong>
                  <i className="bi bi-house-door-fill text-danger"></i>
                </strong>
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
