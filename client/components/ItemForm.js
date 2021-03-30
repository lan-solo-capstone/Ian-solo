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

    uploadPhoto,

    pathname,
  } = props

  const alertReference = new React.createRef()

  return (
    <div
      className="container mt-3 mb-5 justify-content-center py-3"
      style={{maxWidth: '800px'}}
    >
      <form
        className="row row-cols-1 gy-3 justify-content-center needs-validation"
        role="form"
        id="wholeform"
        onSubmit={handleSubmit}
      >
        <div className="col-12 row row-cols-1 row-cols-md-2">
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
                required
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
                required
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
          <div className="col">
            <label htmlFor="itemListName" className="form-label">
              <h5>Item Name</h5>
            </label>
            <input
              type="text"
              className="form-control"
              id="itemListName"
              name="itemListName"
              value={itemListName}
              onChange={handleChange}
              placeholder="Example Name..."
              required
            />
            <div className="invalid-feedback">Please provide a name.</div>
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
              required
            />
          </div>
        </div>

        {/* Only display the photo upload section for new posts */}
        {pathname === '/post' && (
          <div>
            <div className="col px-4">
              <div className="mb-3">
                <label htmlFor="uploadPhoto" className="form-label">
                  <h5>Upload Photos</h5>
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
                      alertReference.current.hidden = false
                      handleFileSelect()
                      return
                    }
                    alertReference.current.hidden = true
                    handleFileSelect(e)
                  }}
                />
                {console.log(props.uploadPhoto, 'props')}
                <div
                  className="row mt-3 justify-content-center"
                  hidden={!uploadPhoto}
                >
                  <label
                    htmlFor="uploadPhoto"
                    className="form-label text-center"
                  >
                    <h5>File Preview</h5>
                  </label>
                  {uploadPhoto &&
                    uploadPhoto.map((elm) => {
                      return (
                        <div
                          key={elm.name + elm.lastModified + elm.size}
                          className="col-auto p-1 m-1 border rounded"
                        >
                          <img
                            src={URL.createObjectURL(elm)}
                            style={{
                              width: '90px',
                              height: '90px',
                              objectFit: 'contain',
                            }}
                          />
                        </div>
                      )
                    })}
                </div>
                <div ref={alertReference} hidden={true} className="mt-2">
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
          style={{maxWidth: '50%'}}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default ItemForm
