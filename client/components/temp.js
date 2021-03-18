import React from 'react'
import {Link} from 'react-router-dom'

//the object format is expected to change per Yoshie and I will address
//that inside both map components. For now, if you link to the map components
//and pass on props as shown below line 35, I will handle the rest.
const temp = () => {
  const itemsArray = [
    {
      id: 1,
      itemListName: 'bicycle',
      description: 'ten speed Schwinn',
      //other fields would be here
      user: {
        geoLocation: {
          coordinates: [40.732, -73.937],
        },
      },
    },
    {
      id: 2,
      itemListName: 'television',
      description: 'color smart tv',
      //other fields would be here
      user: {
        geoLocation: {
          coordinates: [40.731, -73.936],
        },
      },
    },
  ]

  const singleItem = {
    id: 1,
    itemListName: 'bicycle',
    description: 'ten speed Schwinn',
    //other fields would be here
    user: {
      geoLocation: {
        coordinates: [40.732, -73.937],
      },
    },
  }

  return (
    <>
      <div>
        <Link to={{pathname: '/mapallitems', itemsArray: [...itemsArray]}}>
          <button>Map All Items</button>
        </Link>
      </div>

      <div>
        <Link to={{pathname: '/mapsingleitem', item: singleItem}}>
          <button>Map One Item</button>
        </Link>
      </div>
    </>
  )
}

export default temp
