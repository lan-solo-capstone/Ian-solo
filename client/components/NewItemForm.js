import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postNewItem} from '../store/item-jae.js'

class NewItemForm extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <form role="form">
              <div className="row">
                <div>
                  <label className="mr-sm-2" htmlFor="postType">
                    What type of post is this?
                  </label>
                  <select className="custom-select mr-sm-2" id="postType">
                    <option selected>Choose...</option>
                    <option value="Offer">It&apos;s an OFFER of an item</option>
                    <option value="Seeking">
                      It&apos;s a request for a WANTED item
                    </option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="form-group">
                  <label htmlFor="itemName">Item Name</label>
                  <input type="text" className="form-control" id="itemName" />
                </div>
              </div>
              <div className="row">
                <div className="form-group">
                  <label htmlFor="itemDescription">Item Description</label>
                  <textarea
                    className="form-control"
                    id="itemDescription"
                    rows="5"
                  />
                </div>
              </div>
              <div className="row">
                <div>
                  <label className="mr-sm-2" htmlFor="itemCondition">
                    Condition of your item
                  </label>
                  <select className="custom-select mr-sm-2" id="itemCondition">
                    <option selected>Choose...</option>
                    <option value="New">Like New</option>
                    <option value="Gently_Used">Gently Used</option>
                    <option value="Used">Used</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="form-group">
                  <label htmlFor="uploadPhoto">Upload a Photo</label>
                  <input
                    type="file"
                    // need to add other file types to support
                    accept="image/x-png,image/jpeg,image/gif"
                    className="form-control-file"
                    id="uploadPhoto"
                    multiple
                  />
                </div>
              </div>
              <div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewItem: (item) => dispatch(postNewItem(item)),
  }
}
export default connect(null, mapDispatchToProps)(NewItemForm)
