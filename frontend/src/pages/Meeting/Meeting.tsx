import { BackGroundImg } from "../../components/BackGroundImg";
import { styled } from "styled-components";
import Messenger from "../../components/Message/Messenger";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Container, H1, LeftSection, RightSection } from "./Meeting.style";
import App from "../../components/Meeting/OpenVidu/MeetJoin";
import MeetJoin from "../../components/Meeting/OpenVidu/MeetJoin";
import { PostMeetJoinProps } from "../../api/meeting";

export interface MeetingProps {
  meetRoomId: number;
  password: string;
}

function Meeting() {
  const { state } = useLocation(); // 2번 라인
  

  useEffect(() => {
    const newMeetingProps = {
      meetRoomId: state.meetRoomId,
      password: state.password,
    };
  }, []);
  const meetRoomId = state.meetRoomId;
  const password = state.password;

  return (
    <BackGroundImg>
      <Container>
        <MeetJoin props={state} />

        <LeftSection></LeftSection>

        <RightSection>
          <h1>
            {meetRoomId} {password}
          </h1>
        </RightSection>
      </Container>
      <Messenger />
    </BackGroundImg>
  );
}
export default Meeting;
