/* eslint-disable no-warning-comments */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postNewItem} from '../store/item-jae.js'

// TODO: need to flesh out initialState?
const initialState = {
  itemType: 'chooseOne',
  itemListName: '',
  description: '',
  itemCondition: 'chooseOne',
  uploadPhoto: null,
}
class NewItemForm extends Component {
  constructor() {
    super()
    this.state = initialState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fileInput = React.createRef()
  }

  handleChange(evt) {
    console.log('in handle change, evt.target.name', evt.target.name)
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    console.log('evt.target !!!!!!!!!!!!', evt.target)
    console.log('evt.target.files', evt.target.file)
    const formData = new FormData()
    formData.append(
      'photoName',
      this.state.uploadPhoto
      // this.state.uploadPhoto.name
    )

    for (var pair of formData.values()) {
      console.log('form data pair!!!!!', pair)
    }

    console.log('formData-------------------', formData)
    console.log('in handleSubmit photo', this.state.uploadPhoto)
    // const {itemType, itemListName, description, itemCondition} = this.state
    console.log('in handleSubmit this.state', this.state)
    this.props.addNewItem(this.state)
  }
  render() {
    // this log makes sure that state changes when user types on form
    console.log('in NewFormItem render, this.state', this.state)
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <form role="form" id="wholeform" onSubmit={this.handleSubmit}>
              <div className="row">
                <div>
                  <label className="mr-sm-2" htmlFor="itemType">
                    What type of post is this?
                  </label>
                  <select
                    className="custom-select mr-sm-2"
                    name="itemType"
                    value={this.state.itemType}
                    onChange={this.handleChange}
                  >
                    {/* TODO: maybe change these to React Bootstrap buttons
                    https://react-bootstrap.github.io/getting-started/introduction/
                    */}

                    <option value="chooseOne">Choose...</option>
                    <option value="Offer">It&apos;s an OFFER of an item</option>
                    <option value="Seeking">
                      It&apos;s a request for a WANTED item
                    </option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="form-group">
                  <label htmlFor="itemListName">Item Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="itemListName"
                    value={this.state.itemListName}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group">
                  <label htmlFor="description">Item Description</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div>
                  <label className="mr-sm-2" htmlFor="itemCondition">
                    Condition of your item
                  </label>
                  <select
                    className="custom-select mr-sm-2"
                    name="itemCondition"
                    value={this.state.itemCondition}
                    onChange={this.handleChange}
                  >
                    {/* TODO: need to make this appear conditionally if user selects OFFER */}
                    <option value="chooseOne">Choose...</option>
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
                    // TODO: need to add other file types to support
                    // TODO: need to validate file size and maybe number?
                    accept="image/x-png,image/jpeg,image/gif"
                    className="form-control-file"
                    name="uploadPhoto"
                    ref={this.fileInput}
                    // disable multiple for now -- JC
                    // multiple

                    // this is to set the state with the uploaded photo
                    // but not sure if the photo is actually there
                    onChange={(event) => {
                      console.log('in upload photo form', event.target.files)
                      this.setState({uploadPhoto: event.target.files[0]})
                    }}
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
