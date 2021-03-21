import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {MapSingleItem, MapAllItems} from '../components'
import axios from 'axios'

//the object format is expected to change per Yoshie and I will address
//that inside both map components. For now, if you link to the map components
//and pass on props as shown below line 35, I will handle the rest.
const temp = () => {
  useEffect(() => {
    async function fetchData() {
      const address = encodeURIComponent('142 Lions Ct, lake zurich, IL, 60047')
      const data = (
        await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=address&limit=1&access_token=pk.eyJ1IjoibWVsaW5kYWFybWJydXN0ZXIiLCJhIjoiY2trZTd6cHVlMDl5YzJwcXNvMWRvOHU4ciJ9.NdVU55Xhn75BzaVNjACSKQ`
        )
      ).data
      if (data && data.features[0] && data.features[0].center) {
        console.log(
          data.features[0].center[1] + ', ' + data.features[0].center[0]
        )
      } else {
        console.log(data)
        console.log("ERROR: Can't find address!")
      }
    }
    fetchData()
  }, [])

  const itemsArray = [
    {
      id: 1,
      itemListName: 'bicycle',
      description: 'ten speed Schwinn',
      //other fields would be here
      user: {
        latitude: '40.732',
        longitude: '-73.937',
      },
    },
    {
      id: 2,
      itemListName: 'television',
      description: 'color smart tv',
      //other fields would be here
      user: {
        latitude: '40.73',
        longitude: '-73.935',
      },
    },
  ]

  const singleItem = {
    id: 1,
    itemListName: 'bicycle',
    description: 'ten speed Schwinn',
    //other fields would be here
    user: {
      latitude: '40.732',
      longitude: '-73.937',
    },
  }

  return (
    <>
      {/* <div>
        <Link to={{pathname: '/mapallitems', itemsArray: [...itemsArray]}}>
          <button>Map All Items</button>
        </Link>
      </div>

      <div>
        <Link to={{pathname: '/mapsingleitem', item: singleItem}}>
          <button>Map One Item</button>
        </Link>
      </div> */}
      <MapSingleItem item={singleItem} width="100vw" height="100vh" />
      {/* <MapSingleItem item={singleItem} /> */}
    </>
  )
}

export default temp
