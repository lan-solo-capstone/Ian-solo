/* eslint-disable no-warning-comments */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postNewItem} from '../store/item.js'
import {ItemForm} from './index'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// TODO: need to flesh out initialState?
const initialState = {
  itemType: 'chooseOne',
  itemListName: '',
  description: '',
  itemCondition: 'chooseOne',
  uploadPhoto: null,
  user: null,
}

class NewItemForm extends Component {
  constructor() {
    super()
    this.state = initialState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFileSelect = this.handleFileSelect.bind(this)
    this.fileInput = React.createRef()
  }

  handleChange(evt) {
    this.setState({user: this.props.user}) // yf 03.21.21  added userInfo
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleFileSelect(evt) {
    // yf 03/21/21  below line works for both single and multiple file uploads
    const photoFiles = Array.from(evt.target.files)
    this.setState({uploadPhoto: photoFiles})
  }

  // yf 03.21.21  Buggy submit button was fixed.  Cause -timing of updating state.user

  handleSubmit(evt) {
    evt.preventDefault()

    this.props.addNewItem(this.state)

    // TODO: toast notifications are cool but we need to validate the form first, so the toast doesn't trigger prematurely
    toast.success(
      'Your item was successfully created! Check it out on this page under Open Items =)',
      {
        position: 'top-right',
        autoClose: 5001,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      }
    )
  }

  render() {
    // this log makes sure that state changes when user types on form
    console.log('in NewFormItem render, this.props', this.props)

    return (
      <ItemForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handleFileSelect={this.handleFileSelect}
        fileInput={this.fileInput}
        {...this.state}
      />
    )
  }
}

// yf 03.21.21  added state - need user info to associate with the created item.
const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = (dispatch) => {
  return {
    addNewItem: (item) => dispatch(postNewItem(item)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewItemForm)
