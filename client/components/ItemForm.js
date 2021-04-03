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

  const alertReference = React.useRef(null)
  console.log('in ItemForm, fileInput', fileInput)
  // if (fileInput.current?.files) {
  //   console.log(fileInput.current)
  //   delete fileInput.current.files[2]
  // }
  const [photos, photoHandle] = React.useState([])

  return (
    <div
      className="container mt-1 mb-5 justify-content-center py-3"
      style={{maxWidth: '800px'}}
    >
      <form
        className="row row-cols-1 justify-content-center needs-validation"
        role="form"
        id="wholeform"
        onSubmit={handleSubmit}
      >
        <div className="row row-cols-1 row-cols-md-2 mb-3">
          <div className="col mb-2">
            <label className="form-label">
              <div className="fs-5">What kind of post is this?</div>
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
                checked={itemType === 'Offer'}
                id="itemTypeOffer"
                required
              />
              <label className="form-check-label" htmlFor="itemTypeOffer">
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
                id="itemTypeSeeking"
                checked={itemType === 'Seeking'}
                required
              />
              <label className="form-check-label" htmlFor="itemTypeSeeking">
                It&apos;s a request for <b>SEEKING</b> an item
              </label>
            </div>
          </div>

          <div className="col">
            <label className="form-label">
              <div className="fs-5">Condition of your item</div>
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
        <div className="col row mb-3">
          <div className="col mb-2">
            <label htmlFor="itemListName" className="form-label">
              <div className="fs-5">Item Name</div>
            </label>
            <input
              type="text"
              className="form-control"
              id="itemListName"
              name="itemListName"
              value={itemListName}
              onChange={handleChange}
              placeholder="Name..."
              required
            />
            <div className="invalid-feedback">Please provide a name.</div>
          </div>
          <div className="col-12">
            <label htmlFor="description">
              <div className="fs-5">Item Description</div>
            </label>
            <textarea
              className="form-control"
              rows="5"
              name="description"
              id="description"
              value={description}
              onChange={handleChange}
              placeholder="This is a post about..."
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
                  <div className="fs-5">Upload Photos</div>
                </label>

                <input
                  className="form-control"
                  type="file"
                  accept="image/x-png,image/jpeg,image/gif"
                  multiple
                  name="uploadPhoto"
                  id="uploadPhoto"
                  ref={fileInput}
                  onChange={(e) => {
                    if (e.target.files.length > 5) {
                      alertReference.current.hidden = false
                      photoHandle([])
                      handleFileSelect(e)
                      return
                    }
                    alertReference.current.hidden = true
                    photoHandle(Array.from(e.target.files))
                    handleFileSelect(Array.from(e.target.files))
                  }}
                />
                {console.log(props.uploadPhoto, 'props')}
                <div
                  className="row mt-3 justify-content-center"
                  hidden={!photos}
                >
                  <label
                    htmlFor="uploadPhoto"
                    className="form-label text-center"
                  >
                    <div className="fs-5">File Preview</div>
                    <h6>
                      Currently uploading:
                      {photos.length
                        ? ` ${photos.length} photos`
                        : ' No photos'}
                    </h6>
                  </label>
                  {Boolean(photos.length) &&
                    photos.map((elm, idx) => {
                      return (
                        <div
                          className="col-auto p-0"
                          key={elm.name + elm.lastModified + elm.size}
                        >
                          <a
                            className="photoRemoveButton text-secondary"
                            onClick={() => {
                              console.log('awa')
                              const filtered = {
                                target: {
                                  files: photos.filter(
                                    (el, idxFilter) => idxFilter !== idx
                                  ),
                                },
                              }
                              photoHandle(filtered.target.files)
                              handleFileSelect(filtered)
                            }}
                          >
                            <i
                              className="bi bi-x-circle-fill"
                              style={{
                                position: 'relative',
                                right: '-95px',
                                top: '15px',
                              }}
                            />
                          </a>

                          <div className="p-1 m-1 border rounded">
                            <img
                              src={URL.createObjectURL(elm)}
                              style={{
                                width: '90px',
                                height: '90px',
                                objectFit: 'contain',
                              }}
                            />
                          </div>
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
          disabled={props.buttonDisabled}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default ItemForm
