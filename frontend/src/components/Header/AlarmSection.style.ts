import { styled } from "styled-components";

// color: ${props => props.$IsClick ? "white" : "#999999"};

export const Container = styled.div`
`

export const AlarmCount = styled.div`
  position: fixed;
  top: 22px;
  right: 124px;
  background-color: #B3261E;
  border-radius: 100px;
  height: 11px;
  width: 11px;
  font-size: 1px;
  color: white;
  text-align: center;
  line-height: 11px;
  z-index: 9999;
`

export const AlarmListBox = styled.div<{$IsClick:boolean}>`
  display: flex;
  flex-direction: column;
  position: fixed;
  background-color: white;
  border-radius: 5px;
  top: 60px;
  right: 100px;
  height: 280px;
  width: 230px;
  z-index: 9999;

  opacity: ${props => props.$IsClick ? 1 : 0};
`

export const Triangle = styled.div`
  position: fixed;
  top: 48px;
  right: 127px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 15px solid white;
  z-index  : 1;
`

export const AlarmHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  height: 27px;
  width: 230px;
`

export const AlarmWord = styled.p`
  font-size: 11px;
  margin-left: 10px;
`

export const AlarmExitBtn = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 5px;
  cursor: pointer;
`

export const AlarmBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 280px;
  width: 230px;
`

export const AlarmList = styled.div`
  height: 230px;
  width: 220px;
  margin-top: 10px;
  overflow-y: scroll;
  
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    height: 5%; /* 스크롤바의 길이 */
    background: #132b31; /* 스크롤바의 색상 */
    border-radius: 10px;
  }

`
export const AlarmListItem = styled.div`
`

export const AlarmItem = styled.div`
  background-color: #efefef;
  border-radius: 4px;
  margin: 0px 10px 8px 6px;
  padding: 10px;
  font-size: 11px;
  cursor: pointer;

  /* &:hover {
    transform: scale(1.04);
    transition: .3s;
  } */
  /* &:hover {
    background-color: #999999;
  } */
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  }
  /* &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  } */
`

export const AlarmTime = styled.div`
  font-size: 1px;
  margin-right: 10px;
  text-align: right;
  color: #797979;
`