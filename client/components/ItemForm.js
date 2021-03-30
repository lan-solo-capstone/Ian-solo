/* eslint-disable no-warning-comments */
import React from 'react'

const ItemForm = (props) => {
  console.log('in Itemform, props', props)
  const {
    handleChange,
    handleSubmit,
    itemType,
    itemListName,
    description,
    itemCondition,
  } = props

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
      </form>
    </div>
  )
}

export default ItemForm
