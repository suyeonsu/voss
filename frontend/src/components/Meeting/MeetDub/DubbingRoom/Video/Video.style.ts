import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  margin-bottom: 0px;
`
export const Title = styled.h2`
  color: white;
  text-align: left;
  margin-bottom: 30px;
`
export const Display = styled.div`
  background-color: black;
  margin-bottom: 10px;
  height: 250px;
  width: 450px;
`
export const RoleBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  height: 33px;
  margin-bottom: 10px;
`
export const OptionButton = styled.button`
  background-color: transparent;
  border: 1px solid #6C6C6C;
  border-radius: 14px;
  color:#6C6C6C;
  font-size: 13px;
  line-height: 30px;
  height: 30px;
  padding: 0px 7px 0px 7px;
  margin-left: 6px;
  
  &:hover{
    transform: scale(1.1);
    transition: .3s;
  }
`
export const RoleButton = styled(OptionButton)<{$IsClick:boolean}>`
  color: ${props => props.$IsClick ? "white" : "#6C6C6C"};
  border: solid ${props => props.$IsClick ? "2px white" : "1px #6C6C6C"};
`