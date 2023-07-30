package com.yukgaejang.voss.domain.messenger.controller;

import com.yukgaejang.voss.domain.messenger.service.MessengerService;
import com.yukgaejang.voss.domain.messenger.service.dto.request.CreateMessengerRequest;
import com.yukgaejang.voss.domain.messenger.service.dto.response.CreateMessengerResponse;
import com.yukgaejang.voss.domain.messenger.websocket.ChatRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/messenger")
public class MessengerController {
    private final MessengerService messengerService;

    @PostMapping("")
    public CreateMessengerResponse createRoom(@RequestBody CreateMessengerRequest createMessengerRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        createMessengerRequest.setMyMemberEmail(email);
        return messengerService.createRoom(createMessengerRequest);
    }

    @GetMapping("")
    public List<ChatRoom> findAllRoom() {
        return messengerService.findAllRoom();
    }
}
