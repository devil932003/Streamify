import {useParams} from "react-router";
import { useEffect, useState } from "react";
import useAuthUser from "../hooks/useAuthUser.js";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  useCreateChatClient,
} from "stream-chat-react";
import toast from "react-hot-toast";
import ChatLoader from "../components/ChatLoader.jsx";import CallButton from "../components/CallButton.jsx";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const {id: targetUserId} = useParams();
  const [channel, setChannel] = useState(null);
  const {authUser} = useAuthUser();

  const {data: tokenData} = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser
  });

  // Use the useCreateChatClient hook
  const chatClient = useCreateChatClient({
    apiKey: STREAM_API_KEY,
    tokenOrProvider: tokenData?.token,
    userData: authUser ? {
      id: authUser._id,
      name: authUser.fullName,
      image: authUser.profilePic,
    } : undefined,
  });

  useEffect(() => {
    const initChannel = async () => {
      if (!chatClient || !authUser || !targetUserId) return;

      try {
        const channelId = [authUser._id, targetUserId].sort().join("-");
        
        const currChannel = chatClient.channel("messaging", channelId, {
          members: [authUser._id, targetUserId]
        });

        await currChannel.watch();
        setChannel(currChannel);

      } catch (error) {
        console.log("error initializing channel:", error);
        toast.error("Could not connect to chat. Please try again..🫠");
      }
    };

    initChannel();
  }, [chatClient, authUser, targetUserId]);

  if (!chatClient || !channel) return <ChatLoader />;

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;