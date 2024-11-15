"use client"
import React from 'react'
import image1 from "@/assets/svg/btn-chat-1.svg"
import image2 from "@/assets/svg/btn-chat-2.svg"
import image3 from "@/assets/svg/btn-chat-3.svg"
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { enableChat } from '@/Utils/AnimationFunctions'
import { useDetectClickOutside } from 'react-detect-click-outside'

const Chat = ({ config }) => {
  const [chatConfig, setChatConfig] = useState();

  useEffect(() => {
    if (config) {
      setChatConfig(config);
      enableChat();
    }
  }, []);

  const chatRef = useDetectClickOutside({
    onTriggered: () => {
      const chat = chatRef.current;
      if (chat) chat.classList.remove("active");
    }
  });

  if (!chatConfig?.widget) return;

  return (
    <div ref={chatRef} className="chat" data-cursor-style="off">
      <button className="btn-chat">
        <div className="btn-wrapper">
          <span>Hello?</span>
          <div className="container-img btn-top">
            <img
              src={image1.src}
              data-preload
              className="media"
              alt=""
            />
          </div>
          <div className="bg-1"></div>
          <div className="container-img btn-middle">
            <img
              src={image2.src}
              data-preload
              className="media"
              alt=""
            />
          </div>
          <div className="bg-2"></div>
          <div className="container-img btn-bottom">
            <img
              src={image3.src}
              data-preload
              className="media"
              alt=""
            />
          </div>
        </div>
      </button>
      {chatConfig.widget && (
        <div className="container-chat">
          {parse(chatConfig.widget)}
        </div>
      )}
    </div>
  )
}

export default Chat;