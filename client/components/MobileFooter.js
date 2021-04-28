import React from 'react'
import {Link} from 'react-router-dom'

// Render functional
const MobileFooter = () => (
  <div className="row cols-3 gx-2 bg-secondary" style={{height: '6vh'}}>
    <div className="col text-center">
      <Link to="/items" className="text-decoration-none m-0">
        <i className="bi bi-house text-white" style={{fontSize: '1.8rem'}}></i>
      </Link>
    </div>
    <div className="col text-center">
      <Link to="/post" className="text-decoration-none m-0">
        <i className="bi bi-upload text-white" style={{fontSize: '1.8rem'}}></i>
      </Link>
    </div>
    <div className="col text-center">
      <Link to="/useraccount" className="text-decoration-none m-0">
        <i
          className="bi bi-person-circle text-white"
          style={{fontSize: '1.8rem'}}
        ></i>
      </Link>
    </div>
  </div>
)

export default MobileFooter
