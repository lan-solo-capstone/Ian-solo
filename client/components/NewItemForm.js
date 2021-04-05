import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postNewItem} from '../store/item.js'
import {ItemForm} from '../components'

const initialState = {
  itemType: '',
  itemListName: '',
  description: '',
  itemCondition: 'New',
  uploadPhoto: null,
  buttonDisabled: false,
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
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleFileSelect(evt) {
    const photoFiles = Array.from(evt.target.files)
    this.setState({uploadPhoto: photoFiles})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addNewItem(this.state, this.props.user.id)
    this.setState({buttonDisabled: true})
  }

  render() {
    const {handleSubmit, handleChange, handleFileSelect, fileInput} = this
    const {pathname} = this.props.location

    return (
      <ItemForm
        {...this.state}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleFileSelect={handleFileSelect}
        fileInput={fileInput}
        pathname={pathname}
        buttonDisabled={this.state.buttonDisabled}
      />
    )
  }
}

// yf 03.21.21  need user info to associate with the created item.
const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = (dispatch) => {
  return {
    addNewItem: (item, userId) => dispatch(postNewItem(item, userId)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewItemForm)
