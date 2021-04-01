/* eslint-disable no-warning-comments */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {modifyItem} from '../store/item.js'
import {ItemForm} from './index'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const initialState = {
  itemType: null,
  itemListName: '',
  description: '',
  itemCondition: null,
}

class EditItemForm extends Component {
  constructor() {
    super()
    this.state = initialState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fileInput = React.createRef()
  }
  componentDidMount() {
    console.log(
      'in EditItemForm componentDidMount, this.props, this.state',
      this.props,
      this.state
    )

    if (this.props.location.state.item) {
      const {
        itemType,
        itemListName,
        description,
        itemCondition,
      } = this.props.location.state.item

      this.setState({itemType, itemListName, description, itemCondition})
    }
  }

  componentDidUpdate() {}

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })

    // make sure itemCondition gets cleared out if itemType changes
    if (this.state.itemType === 'Seeking') {
      this.setState({itemCondition: null})
    }
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const itemId = this.props.location.state.item.id
    const {itemType, itemListName, description, itemCondition} = this.state
    const userId = this.props.location.state.item.user.id
    this.props.modifyItem(itemId, {
      itemType,
      itemListName,
      description,
      itemCondition,
      user: {id: userId},
    })
    console.log(
      'in handle Submit for edit item, this.props.location.state.item.id, state',
      this.props.location.state.item.id,
      this.state
    )
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

      // disabling updates of photos for now -- JC 3.29.21
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
