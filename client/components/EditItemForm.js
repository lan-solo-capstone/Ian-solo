import React, {Component} from 'react'
import {connect} from 'react-redux'
import {modifyItem} from '../store/item'
import {ItemForm} from '../components'

const initialState = {
  itemType: null,
  itemListName: '',
  description: '',
  itemCondition: null,
  buttonDisabled: false,
}

class EditItemForm extends Component {
  constructor() {
    super()
    this.state = initialState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fileInput = React.createRef()
  }

  // pre-populate item if the item has already loaded
  componentDidMount() {
    const loadedItem = this.props.location.state.item
    if (loadedItem) {
      const {itemType, itemListName, description, itemCondition} = loadedItem
      this.setState({itemType, itemListName, description, itemCondition})
    }
  }

  // if item has been updated, then re-enable submit button
  // and close modal
  componentDidUpdate(prevProps) {
    const prevItem = prevProps.location.state.item.updatedAt
    const updatedItem = this.props.location.state.item.updatedAt
    const {editItemButton} = this.props

    if (prevItem !== updatedItem) {
      this.setState({buttonDisabled: false})
      editItemButton.current.click()
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  // on submit, send modifications and toast message
  // also disable submit button temporarily and close modal
  handleSubmit(evt) {
    evt.preventDefault()
    const itemId = this.props.location.state.item.id
    const userId = this.props.location.state.item.user.id
    const {itemType, itemListName, description, itemCondition} = this.state
    const {editItemButton} = this.props

    this.props.modifyItem(
      itemId,
      {
        itemType,
        itemListName,
        description,
        itemCondition,
        user: {id: userId},
      },
      'Changes saved!'
    )

    this.setState({buttonDisabled: true})
    editItemButton.current.click()
  }

  render() {
    const {handleSubmit, handleChange} = this
    const {pathname} = this.props.location

    return (
      <div>
        <p>If you'd like to edit your posted item, you can do so here:</p>
        <ItemForm
          {...this.state}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
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
    modifyItem: (itemId, modifications, toastMessage) =>
      dispatch(modifyItem(itemId, modifications, toastMessage)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditItemForm)
