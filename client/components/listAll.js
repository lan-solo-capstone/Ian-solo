import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllItems} from '../store/listAll'
import SingleItem from './singleItem'

// Render functional
// const Placeholder = (props) => <div></div>

// Render Class
class ListAll extends React.Component {
  componentDidMount() {
    this.props.fetchAllItems()
  }

  createEventListener() {}

  render() {
    const items = this.props.items

    return this.props.loading ? (
      <div
        className="spinner-border position-absolute top-50 start-50 translate-middle"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    ) : (
      <div className="container container-lg container-x">
        <h3 className="display-6 text-center text-light bg-secondary rounded-3 ">
          All Current offers
        </h3>
        {console.log(this.props.items)}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {items.map((item) => (
            <SingleItem
              key={item.id}
              itemType={item.itemType}
              itemListName={item.itemListName}
            />
          ))}
        </div>
        <div className="fixed-bottom d-md-none">
          <div>
            <a
              className="btn btn-secondary mx-auto mb-3 rounded-pill d-flex justify-content-evenly align-items-center"
              data-bs-toggle="collapse"
              href="#mapCollapse"
              role="button"
              id="mapCollapseButton"
              style={{width: '150px', height: '30px'}}
            >
              <p className="m-0">View on map</p>
              <i
                className="bi bi-compass"
                style={{
                  'font-size': '1.4rem',
                  color: 'white',
                }}
              />
            </a>
            <div className="collapse" id="mapCollapse">
              <a
                className="btn btn-secondary m-auto rounded-0 rounded-top d-flex justify-content-center align-items-center"
                data-bs-toggle="collapse"
                href="#mapCollapse"
                role="button"
                style={{width: '70px', height: '30px'}}
              >
                <i
                  className="bi bi-chevron-compact-up"
                  id="chevron-rotate"
                  style={{
                    'font-size': '2rem',
                    color: 'white',
                  }}
                />
              </a>
              <div
                className="bg-secondary rounded-top text-light p-3"
                style={{height: '95vh'}}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                lacus libero, dignissim ac faucibus eget, suscipit id magna.
                Duis maximus lacus elit, sit amet tincidunt libero tempus vel.
                Mauris ac mollis ex, eu tempor eros. Donec turpis orci, placerat
                in dui id, posuere fringilla erat. Nam ac arcu feugiat, aliquet
                lectus ut, dictum ipsum. Duis eget lacus facilisis, rutrum lacus
                sed, hendrerit tellus. Curabitur sagittis lacinia nulla ut
                feugiat. Nulla condimentum diam vel ex bibendum suscipit. Duis
                in mauris nulla. Suspendisse accumsan metus metus, semper
                aliquet turpis elementum quis. Mauris posuere placerat lacinia.
                Ut bibendum dolor nec odio dictum tristique. Interdum et
                malesuada fames ac ante ipsum primis in faucibus. Maecenas non
                eros suscipit, pretium est vel, ultrices neque. Donec imperdiet
                urna odio, at pellentesque turpis mollis vehicula.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */

const mapState = (state) => ({
  items: state.listAll.items,
  loading: state.listAll.loading,
})

const mapDispatch = (dispatch) => ({
  fetchAllItems: () => {
    dispatch(fetchAllItems())
  },
})

export default connect(mapState, mapDispatch)(ListAll)

/**
 * PROP TYPES
 */
ListAll.propTypes = {
  items: PropTypes.array,
  loading: PropTypes.bool,
}
