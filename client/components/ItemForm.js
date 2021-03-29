/* eslint-disable no-warning-comments */
import React from 'react'

const ItemForm = (props) => {
  console.log('in Itemform, props', props)
  const {
    handleChange,
    handleSubmit,
    handleFileSelect,
    itemType,
    itemListName,
    description,
    itemCondition,
    fileInput,
  } = props

  return (
    <div className="container-fluid footerSpacing">
      <div className="row">
        <div className="col-md-12 p-0">
          <form
            role="form"
            id="wholeform"
            onSubmit={handleSubmit}
            style={{width: '90vw'}}
          >
            <div className="row">
              <div>
                <label className="mr-sm-2" htmlFor="itemType">
                  What type of post is this?
                </label>
                <select
                  className="custom-select mr-sm-2"
                  name="itemType"
                  value={itemType}
                  onChange={handleChange}
                >
                  {/* TODO: maybe change these to React Bootstrap buttons
                    https://react-bootstrap.github.io/getting-started/introduction/
                    */}

                  <option value="chooseOne">Choose...</option>
                  <option value="Offer">It&apos;s an OFFER of an item</option>
                  <option value="Seeking">
                    It&apos;s a request for a SEEKING item
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
                  value={itemListName}
                  onChange={handleChange}
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
                  value={description}
                  onChange={handleChange}
                />
              </div>
            </div>
            {itemType === 'Offer' && (
              <div className="row">
                <div>
                  <label className="mr-sm-2" htmlFor="itemCondition">
                    Condition of your item
                  </label>

                  <select
                    className="custom-select mr-sm-2"
                    name="itemCondition"
                    value={itemCondition}
                    onChange={handleChange}
                  >
                    <option value="chooseOne">Choose...</option>
                    <option value="New">Like New</option>
                    <option value="Gently_Used">Gently Used</option>
                    <option value="Used">Used</option>
                  </select>
                </div>
              </div>
            )}
            <div className="row">
              <div className="form-group">
                <label htmlFor="uploadPhoto">Upload Photos</label>
                <p>
                  Photos are optional, but they tend to increase the chances
                  that someone will contact you (especially for offers). You can
                  upload up to 5 photos.
                </p>
                <input
                  type="file"
                  multiple
                  // TODO: need to add other file types to support
                  // TODO: need to validate file size and maybe number?
                  accept="image/x-png,image/jpeg,image/gif"
                  className="form-control-file"
                  name="uploadPhoto"
                  ref={fileInput}
                  onChange={handleFileSelect}
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

export default ItemForm
