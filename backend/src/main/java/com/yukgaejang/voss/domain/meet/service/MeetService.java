package com.yukgaejang.voss.domain.meet.service;

import com.yukgaejang.voss.domain.meet.service.dto.request.CreateSessionIdRequest;
import com.yukgaejang.voss.domain.meet.service.dto.response.InitMeetRoomResponse;
import com.yukgaejang.voss.domain.meet.service.dto.response.ViewAllMeetRoomResponse;
import org.springframework.data.domain.Page;

public interface MeetService {

    Page<ViewAllMeetRoomResponse> getMeetList(int page, int limit);

    InitMeetRoomResponse initMeetRoom(CreateSessionIdRequest createSessionIdRequest);
}
