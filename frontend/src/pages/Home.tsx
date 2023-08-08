import React, { useState } from "react";
import { styled } from "styled-components";
import Login from "../components/Home/Login/Login";
import Join from "../components/Home/Join/Join";
// import mainimg from "/src/assets/main/mainimg.gif";
import HomeContent from "../components/Home/HomeContent/HomeContent"
import Messenger from "../components/Message/Messenger";
import { useRecoilState } from "recoil";
import { LoginModeAtom } from "../recoil/Auth";
import mainimg from "/src/assets/main/mainimg.gif"

export const Mainimg = styled.div`
  background-image: url("${mainimg}");
  background-repeat: no-repeat;
  background-position: 10% 50%;
  background-size: cover;
  position: absolute;
  width: 118vw;
  left: -6vw;
  height: 100vh;
`;

function Home() {
  const [loginMode, setLoginMode] = useRecoilState(LoginModeAtom);

  return (
    <Mainimg>
      <div>
        <HomeContent></HomeContent>
        {loginMode 
        ? <Login /> 
        : <Join />}
        <Messenger></Messenger>
      </div>
    </Mainimg>
  );
}

export default Home;
