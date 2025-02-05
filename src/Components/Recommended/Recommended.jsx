import React, { useEffect, useState } from 'react'
import './Recommended.css'
import thumb from '../../assets/thumbnail1.png'
import thumb2 from '../../assets/thumbnail2.png'
import thumb3 from '../../assets/thumbnail3.png'
import thumb4 from '../../assets/thumbnail4.png'
import thumb5 from '../../assets/thumbnail5.png'
import thumb6 from '../../assets/thumbnail6.png'
import thumb7 from '../../assets/thumbnail7.png'
import thumb8 from '../../assets/thumbnail8.png'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import { NavLink } from 'react-router-dom'
const Recommended = ({categoryId}) => {
  
  const [apiData, setApiData] = useState([])
  
  const fetchData = async () => {
    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(relatedVideo_url)
      .then(res => res.json())
      .then(data => setApiData(data.items))
  }
  console.log(apiData);
  
  useEffect(() => {
    fetchData();
  },[])
  
  return (
    <div className='recommended'>
      {apiData.map((item,index) => {
        return (
          <NavLink to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className='side-video-list'>
          <img src={item.snippet.thumbnails.default.url} alt="" />
          <div className='vid-info'>
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{value_converter(moment(item.snippet.publishedAt).fromNow())}</p>
          </div>
        </NavLink>
        )
      })}
    </div>
  )
}

export default Recommended
