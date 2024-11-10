import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const PlayVideo = () => {
  
  const { videoId } = useParams();

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentsData, setCommentsData] = useState(null)
  
  const fetchVideoData = async() => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url)
      .then(res => res.json())
      .then(data => setApiData(data.items[0]))
  }

  const fetchChannelData = async () => {
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&maxResults=50&key=${API_KEY}`
    await fetch(channelData_url)
      .then(res => res.json())
      .then(data => setChannelData(data.items[0]));
  }

  const fetchcommentData = async () => {
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&part=replies&videoId=${videoId}&maxResults=50&key=${API_KEY}`;
    await fetch(comment_url)
      .then(res => res.json())
      .then(data => setCommentsData(data.items))
  }

  

  useEffect(() => {
    fetchVideoData();
  }, [videoId])
  
  useEffect(() => {
    fetchChannelData();
  }, [apiData])
  
  useEffect(() => {
    fetchcommentData();
  },[apiData])
  return (
    <div className='play-video'>
      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} ></iframe>
      <h3>{ apiData?apiData.snippet.title:"Title Here"}</h3>
          <div className='play-video-info'>
        <p>{apiData?value_converter(apiData.statistics.viewCount):"16K"} Views &bull; { moment(apiData?apiData?.snippet.publishedAt:"").fromNow() }</p>
              <div className='likeDeslike'>
                  <span><img src={like} alt="" />{apiData?.statistics?.likeCount }</span>
                  <span><img src={dislike} alt="" /></span>
                  <span><img src={share} alt="" />Share</span>
                  <span><img src={save} alt="" />Save</span>
              </div>
          </div>
          <hr />
          <div  className='publisher'> 
              <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="" />
              <div>
                  <p>{apiData?.snippet?.channelTitle}</p>
                  <span>{channelData?value_converter(channelData.statistics.subscriberCount):""}</span>
              </div>
              <button>Subcribe</button>
          </div>
          <div className='vid-description'>
            <p>{apiData?apiData.snippet.description.slice(0,120):""}</p>
            <hr />
            <h4>{value_converter(apiData?apiData.statistics.commentCount:"")} Comments</h4>
            {commentsData?.map((item,index)=>{
              return (
                <div className="comment" key={index}>
              <img src={commentsData?item.snippet.topLevelComment.snippet.authorProfileImageUrl:""} alt="" />
              <div>
                    <h3>{commentsData?item.snippet.topLevelComment.snippet.authorDisplayName:""} <span>{commentsData?moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow():""}</span></h3>
                    <p>{commentsData?item.snippet.topLevelComment.snippet.textDisplay:""}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                      <span>{commentsData?item.snippet.topLevelComment.snippet.likeCount:""}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
              )
            })}
          </div>
    </div>
  )
}

export default PlayVideo;
