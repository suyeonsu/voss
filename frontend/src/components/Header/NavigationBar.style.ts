import { styled } from "styled-components";


export const Navbar = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.25px solid grey;
  height: 65px;
  width: 100vw;
`
export const LeftSection = styled.div`
  display: flex;
  align-items: center;
`
export const Logo = styled.img`
  cursor: pointer;
  height: 35px;
  width: 63px;
  margin: 0px 30px 0px 40px;
`
export const MenuList = styled.ul`
  display: flex;
  list-style: none;
  line-height: 65px;
  height: 65px;
  width: 400px;
`

export const Menu = styled.li`
  text-align: center;
  width: 120px;
  color: white;
  font-size: 16px;
  height: 62px;
  line-height: 64px;
  
  cursor: pointer;
  position: relative;

  &:hover {
    border-bottom: solid 3px #efefef;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, transparent 0%, white 100%);
      opacity: 0.1; /* 조절 가능한 투명도 */
      pointer-events: none;
    }
  }
`;

export const IconList = styled.div`
  display: flex;
  align-items: center;
  margin-right: 25px;
`
export const Alarm = styled.div<{$AlarmIsShown?: boolean}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  margin-right: 20px;
  height: 30px;
  width: 30px;
  background-color: ${props => props.$AlarmIsShown ? "#949494" : ""};
  cursor: pointer;
  
  &:hover {
    background-color: #949494;
  }
`

export const AlarmIcon = styled.img`
  height: 30px;
`
export const Profile = styled.img`
  height: 46px;
  margin-right: 30px;
  z-index: 1;
`
export const ProfileHover =styled.img`
  border: solid 1px white;
  width: 10vw;
  height: 10vh;
`

export const EmptySpace = styled.div`
  height: 70px;
`

export const ProfileHoverList = styled.div`
  display: flex;
  background-color: white;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 60px;
  right: 40px;
  width: 68px;
  height: 100px;
  padding: 0px 5px 0px 5px;
  border-radius: 2px;
  /* border: dotted 1px yellow; */
  `;

export const ProfileHoverListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 68px;
  height: 25px;
  font-size: 5px;
  border-bottom: solid 1px #d9d9d9;
  // 마우스 호버 시에 작동
  
  &:hover {
    text-decoration: underline;
    font-weight: bold;
    color: black;
  }
`;

export const ProfileHoverTriangle = styled.div`
  position: fixed;
  top: 52px;
  right: 72px;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 10px solid white; 
  z-index: 2;
`
