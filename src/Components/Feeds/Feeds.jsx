import React, { useEffect, useState } from 'react'
import './Feeds.css'
import { API_KEY } from '../../data'
import {value_converter} from '../../data'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
const Feeds = ({ sidebar , category }) => {
  
  const [data, setData] = useState([]);
  console.log(data);
  
  const fetchData = async () => {
    const videoList_url =`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&part=contentDetails&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY} `
    await fetch(videoList_url)
      .then(response => response.json())
      .then(data => setData(data.items)) 
  }
  useEffect(() => {
    fetchData();
  },[category])
  return (
    <div className={`feed container ${sidebar ? "" : "large-container"}`}>
      {data.map((item, index) => {
        return (
        <NavLink to={`video/${item.snippet.categoryId}/${item.id}`}>
          <div className='card'>
              <img src={item.snippet.thumbnails.medium.url} alt="" />
              <h2>{ item.snippet.title }</h2>
              <h3>{item.snippet.channelTitle}</h3>
              <p>{value_converter(item.statistics.viewCount)} View &bull; {moment(item.snippet.publishedAt).fromNow()}</p>    
          </div>
        </NavLink> 
        )
      })}
    </div>
  )
}

export default Feeds
