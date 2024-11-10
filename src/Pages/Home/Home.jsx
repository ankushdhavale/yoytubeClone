import React, { useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feeds from '../../Components/Feeds/Feeds'
const Home = ({ sidebar }) => {
  const [category, setCatogery] = useState(0);
  return (
    <div>
      <Sidebar sidebar={sidebar} category={category} setCatogery={setCatogery} />
        <div className={`container ${sidebar?"":'large-container'}`}>
          <Feeds category={category} setCatogery={setCatogery} sidebar={sidebar} />
        </div>
    </div>
  )
}

export default Home
