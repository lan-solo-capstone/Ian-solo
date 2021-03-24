import React from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'

//accepts props: item=object <MapSingleItem item=object>
class MapSingleItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        latitude: this.props.item ? +this.props.item.user.latitude : 40.73061,
        longitude: this.props.item
          ? +this.props.item.user.longitude
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
            {this.props.item && (
              <Marker
                latitude={+this.props.item.user.latitude}
                longitude={+this.props.item.user.longitude}
              >
                {this.props.item.itemType === 'Offer' ? (
                  <i className="h1 bi bi-pin-fill text-success"></i>
                ) : (
                  <i className="h1 bi bi-pin-fill text-danger"></i>
                )}
              </Marker>
            )}
            {this.props.isLoggedIn && (
              <Marker
                latitude={+this.props.user.latitude}
                longitude={+this.props.user.longitude}
              >
                <i className="h1 bi bi-house-door-fill text-primary"></i>
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

export default connect(mapState, null)(MapSingleItem)

MapSingleItem.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
  location: PropTypes.object,
}
