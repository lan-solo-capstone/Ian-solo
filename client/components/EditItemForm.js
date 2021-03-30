/* eslint-disable no-warning-comments */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {modifyItem} from '../store/item.js'
import {ItemForm} from './index'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const initialState = {
  itemType: 'chooseOne',
  itemListName: '',
  description: '',
  itemCondition: 'chooseOne',
  uploadPhoto: null,
  user: null,
}

class EditItemForm extends Component {
  constructor() {
    super()
    this.state = initialState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleFileSelect = this.handleFileSelect.bind(this)
    this.fileInput = React.createRef()
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps)
  // }

  handleChange(evt) {
    // TODO: Is it a bad idea to load state with props? -- JC 3.29.21
    this.setState({user: this.props.user}) // yf 03.21.21  added userInfo
    this.setState({
      [evt.target.name]: evt.target.value,
    })
    if (this.state.itemType === 'Seeking') {
      this.setState({itemCondition: null})
    }
  }

  // TODO: add logic to set itemCondition to '' if user changes itemType to Seeking
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.modifyItem(this.props.location.state.item.id, this.state)

    // TODO: toast notifications are cool but we need to validate the form first, so the toast doesn't trigger prematurely
    toast.success('Changes saved!', {
      position: 'top-right',
      autoClose: 5001,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    })
  }

  render() {
    const {
      handleSubmit,
      handleChange,
      // handleFileSelect,
      // fileInput
    } = this
    const {pathname} = this.props.location
    // this log makes sure that state changes when user types on form
    console.log('in EditItemForm render, this.props', this.props)

    return (
      <div>
        <p>If you'd like to edit your posted item, you can do so here:</p>
        <ItemForm
          {...this.state}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          // handleFileSelect={handleFileSelect}
          // fileInput={fileInput}
          pathname={pathname}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  item: state.item,
})

const mapDispatchToProps = (dispatch) => {
  return {
    modifyItem: (itemId, modifications) =>
      dispatch(modifyItem(itemId, modifications)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditItemForm)
