import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { CurrentUserAtom, ProfileState, ModalOpenState, FollowerTabState ,FollowerListState, FollowingListState } from "/src/recoil/Auth";
import { postFollow, deleteUnfollow, getFollowers, getFollowings  } from '/src/api/profile';
import UpdateIcon from "/src/assets/Profile/UpdateIcon.png";
import ProfileNull from "/src/assets/Profile/ProfileNull.png"
import {
    BasicBoxDesign,
    ProfileImgDesign,
    ProfileImgDesign2,
    ProfileInfoDesign,
    ProfileNameBoxDesign,
    ProfileNameDesign,
    ProfileBtnDesign,
    FollowButton,
    FollowingButton,
    FollowBoxDesign,
    ProfileFollowerDesign,
    ProfileFollowingDesign,
    ProfileFollowingSpaceDesign,
} from "./BasicBox.style";

const FILE_SERVER_URL = "https://b106-voss.s3.ap-northeast-2.amazonaws.com"

function BasicBox() {
  const id = parseInt(useParams().id || "");
  const currentUser = useRecoilValue(CurrentUserAtom)
  const [isModalOpen, setIsModalOpen] = useRecoilState(ModalOpenState);
  const [followerTabShow, setFollowerTabShow] = useRecoilState(FollowerTabState)
  const [followers, setFollowers] = useRecoilState(FollowerListState)
  const [followings, setFollowings] = useRecoilState(FollowingListState)
  const [followerCount, setFollowerCount] = useState(0);
  const [profile, setProfile] = useRecoilState(ProfileState)
  const setFollow = () => {
    profile.isFollowing
    ? setFollowerCount(followerCount - 1)
    : setFollowerCount(followerCount + 1);
    setProfile({...profile, isFollowing: !profile.isFollowing})
  };
  const [showImgUpdate, setImgUpdate] = useState(false)

  useEffect(()=> {
    getFollowings(id).then(followings => {
      if (followings) {setFollowings(followings)};
    })
    getFollowers(id).then(followers => {
      if (followers) {setFollowers(followers); setFollowerCount(followers.length)};
    })
  }, [isModalOpen])

  return (
    <> { profile.id > 0
    ? <BasicBoxDesign>
      <ProfileImgDesign>
        <ProfileImgDesign2
        onMouseEnter={()=>setImgUpdate(true)}
        onMouseLeave={()=>setImgUpdate(false)}>
          {showImgUpdate ? <img id='updateIcon' style={{width: '1.6vw', height: '1.6vw', zIndex: '1'}} src={UpdateIcon} alt="" /> : null}
          { profile.imageUrl
            ? <img src={`${FILE_SERVER_URL}/${profile.imageUrl}`} />
            : <img style={{ width: '115%', height: '115%', margin: '0 auto'}} src={ProfileNull} />
          }
        </ProfileImgDesign2>
      </ProfileImgDesign>
      
      <ProfileInfoDesign>

        <ProfileNameBoxDesign>
          <ProfileNameDesign>{profile.nickname}</ProfileNameDesign>
            { id === currentUser.userid
            ? <ProfileBtnDesign><img src={UpdateIcon} alt=""/></ProfileBtnDesign>
            : profile.isFollowing
            ? <FollowingButton onClick={() => (setFollow(), postFollow(id))}>팔로잉</FollowingButton>
              : <FollowButton onClick={()=>(setFollow(), deleteUnfollow(id))}>팔로우</FollowButton>
            }
        </ProfileNameBoxDesign>

        <FollowBoxDesign>
          <ProfileFollowerDesign onClick={() => (setIsModalOpen(true), setFollowerTabShow(true))}>
            <p>팔로워</p>
            <p>{followerCount} 명</p>
          </ProfileFollowerDesign>
          <ProfileFollowingDesign onClick={() => (setIsModalOpen(true), setFollowerTabShow(false))}>
            <p>팔로잉</p>
            <p>{followings.length} 명</p>
          </ProfileFollowingDesign>
          <ProfileFollowingSpaceDesign/>
        </FollowBoxDesign>

      </ProfileInfoDesign>
      
    </BasicBoxDesign>
    : <h3 style={{color: 'white'}}>회원 정보가 없습니다</h3>
    } </>
    );
  };

  export default BasicBox;