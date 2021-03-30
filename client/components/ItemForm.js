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
    pathname,
  } = props

  const alertRefrence = new React.createRef()

  return (
    <div className="container-sm container-md footerSpacing mt-2 justify-content-center py-3">
      <form
        className="row row-cols-1 gy-3 justify-content-center"
        role="form"
        id="wholeform"
        onSubmit={handleSubmit}
      >
        <div className="col-auto row row-cols-1 row-cols-md-2">
          <div className="col">
            <label className="form-label">
              <h5>What kind of post is this?</h5>
            </label>
            <>
              {/* <select
            className="form-select itemType"
            name="itemType"
            value={itemType}
            onChange={handleChange}
          >
            <option value="chooseOne">Choose...</option>
            <option value="Offer">It&apos;s an OFFER of an item</option>
            <option value="Seeking">
              It&apos;s a request for a SEEKING item
            </option>
          </select> */}
            </>

            <div
              className="form-check"
              name="itemType"
              value={itemType}
              onChange={handleChange}
            >
              <input
                className="form-check-input"
                type="radio"
                name="itemType"
                value="Offer"
              />
              <label className="form-check-label">
                It&apos;s an <b>OFFER</b> of an item
              </label>
            </div>
            <div
              className="form-check"
              name="itemType"
              value={itemType}
              onChange={handleChange}
            >
              <input
                className="form-check-input"
                type="radio"
                name="itemType"
                value="Seeking"
              />
              <label className="form-check-label">
                It&apos;s a request for <b>SEEKING</b> an item
              </label>
            </div>
          </div>

          <div className="col">
            <label className="form-label">
              <h5>Condition of your item</h5>
            </label>
            <select
              className="form-select itemType"
              name="itemCondition"
              value={itemCondition || 'New'}
              onChange={handleChange}
              disabled={itemType !== 'Offer'}
            >
              <option value="New">Like New</option>
              <option value="Gently_Used">Gently Used</option>
              <option value="Used">Used</option>
            </select>
          </div>
        </div>

        <div className="col row">
          <div className="col-6">
            <label htmlFor="itemListName" className="form-label">
              <h5>Item Name</h5>
            </label>
            <input
              type="text"
              className="form-control"
              name="itemListName"
              value={itemListName}
              onChange={handleChange}
              placeholder="Example Name..."
            />
          </div>
          <div className="col-12">
            <label htmlFor="description">
              <h5>Item Description</h5>
            </label>
            <textarea
              className="form-control"
              rows="5"
              name="description"
              value={description}
              onChange={handleChange}
              placeholder="Example description... Ipsum loram"
            />
          </div>
        </div>

        {pathname === '/post' && (
          <div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="uploadPhoto" className="form-label">
                  Upload Photos
                </label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/x-png,image/jpeg,image/gif"
                  multiple
                  name="uploadPhoto"
                  ref={fileInput}
                  onChange={(e) => {
                    if (e.target.files.length > 5) {
                      alertRefrence.current.hidden = false
                      return
                    }
                    alertRefrence.current.hidden = true
                    handleFileSelect(e)
                  }}
                />
                <div ref={alertRefrence} hidden={true} className="mt-2">
                  <div className="alert alert-danger" role="alert">
                    Max of 5 files allowed.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <button
          type="submit"
          className="btn btn-primary"
          style={{maxWidth: '80%'}}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default ItemForm
