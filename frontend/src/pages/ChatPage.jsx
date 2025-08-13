import {useParams} from "react-router";
import { useEffect, useState } from "react";
import useAuthUser from "../hooks/useAuthUser.js";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";


const ChatPage = () => {
  const {id:targetuserId} = useParams();
  const [chatClient,setChatClient] = useState(null);
  const [channel,setChannel] = useState(null);
  const [loading,setLoading] = useState(true);
  const {authUser}=useAuthUser();

  const {data:tokenData} = useQuery({
    queryKey:["streamToken"],
    queryFn:getStreamToken,
    enabled:!!authUser  // this will run only when authUser us available
  })

  useEffect(()=>{
    const initChat =async()=>{
    if(!tokenData?.tooken || !authUser) return;

    try{
      console
    }
    }
  })

  return (
    <div>ChatPage</div>
  )
}

export default ChatPage