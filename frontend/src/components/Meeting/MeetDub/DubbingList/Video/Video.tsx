import { useRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { videoFilterState } from "/src/recoil/Training"
import { meetDubSelectState } from "/src/recoil/HW_Atom"
import { postRractice } from "/src/api/profile"
import { VideosType } from "/src/type/type"
import { 
  Count, 
  CountImg, 
  Description, 
  Infos, 
  Thumbnail, 
  Time, 
  TimeImg, 
  VideoBox, 
  VideoItem } from "./Video.style"

function Video () {
  const [videoFilter] = useRecoilState<VideosType[]>(videoFilterState)
  const [meetDubSelect, setMeetDubSelect] = useRecoilState<number>(meetDubSelectState)
  
  const meetDubSelecting = (id:number) => {
    setMeetDubSelect(id)
    // void postRractice("DUB")
  }

  const formatTime = (durationInSec: number) => {
    const minutes = Math.floor(durationInSec / 60)
    const second = Math.floor(durationInSec % 60)
    return `${minutes.toString().padStart(2, '0')}분 ${second.toString().padStart(2, '0')}초`
  }

  return (
    <VideoBox>
      {videoFilter.map((video,index) => (
        <VideoItem 
          key={index}
          onClick={() => void meetDubSelecting(video.id)}>
          <Thumbnail src={`https://img.youtube.com/vi/${video.videoUrl.slice(-11)}/mqdefault.jpg`}></Thumbnail>
          {/* <Thumbnail 
            key={`player-${index}`} 
            id={`player-${index}`}></Thumbnail> */}
          <Infos>
            <Count>
              <CountImg src="/src/assets/Dubbing/count.png"/>
              {video.roleCnt}인
            </Count>
            <Time>
              <TimeImg src="/src/assets/Dubbing/time.png"/>
              {formatTime(video.durationInSec)}
            </Time>
          </Infos>
          
          <Description>{video.title}</Description>
        </VideoItem>
      ))}
    </VideoBox>
  )
}
export default Video