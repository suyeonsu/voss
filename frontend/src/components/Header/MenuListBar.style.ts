import { styled } from "styled-components";


export const MenuBox = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-around;
  background-color: rgb(0,0,0,0.6);
  border-radius: 0px 0px 5px 5px;
  border-top: 0.25px solid grey;
  backdrop-filter: blur(5px);
  margin-left: 172px;
  height: 130px;
  width: 368px;
  z-index: 1;
  top: 65px;
`
export const Menuitems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
export const Item = styled.div`
  color  : white;
  font-size: 156x;
  margin: 12px auto;
  cursor: pointer;
`