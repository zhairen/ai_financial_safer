import { useState } from 'react';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationList,
  Conversation,
  Avatar,
  Sidebar, // 新增侧边栏组件
  Search, // 新增搜索组件
  ConversationHeader, // 新增对话头部组件
  TypingIndicator, // 新增输入提示组件
  VoiceCallButton, // 新增通话按钮
  VideoCallButton, // 新增视频按钮
  InfoButton, // 新增信息按钮
  ExpansionPanel, // 新增扩展面板组件
} from "@chatscope/chat-ui-kit-react";

// 硬编码对话列表数据（匹配官方示例字段）
const HARDCODED_CONVERSATIONS = [
  {
    id: 1,
    name: "AI 投顾",
    lastSenderName: "AI 投顾",
    info: "今日美元兑人民币中间价6.95，建议关注美联储政策",
    avatar: "https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
  },
  {
    id: 2,
    name: "投资助手",
    lastSenderName: "用户",
    info: "已收到您的黄金投资咨询，稍后回复",
    avatar: "https://chatscope.io/storybook/react/assets/joe-v8Vy3KOS.svg"
  },
  // ... 其他对话项保持与官方示例一致
];

// 硬编码消息列表数据（补充 direction/position 字段）
const HARDCODED_MESSAGES = [
  {
    id: 1,
    message: "您好！我是AI投顾，今日外汇市场主要关注...",
    sentTime: "09:15",
    sender: "AI 投顾",
    direction: "incoming", // 官方要求的消息方向
    position: "single", // 官方要求的消息位置
  },
  {
    id: 2,
    message: "了解，近期美元走势如何？",
    sentTime: "15 mins ago",
    sender: "用户",
    direction: "incoming",
    position: "last", // 连续消息的最后一条
  },
  {
    id: 3,
    message: "美元指数昨日上涨0.3%，主要受...",
    sentTime: "15 mins ago",
    sender: "AI 投顾",
    direction: "incoming",
    position: "single", // 连续消息的最后一条
  },
];

const ChatWindow = () => {
  const [messages] = useState(HARDCODED_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);

  return (
    <MainContainer responsive style={{ height: "600px" }}>
      {/* 左侧侧边栏（保持不变） */}
      <Sidebar position="left">
        <Search placeholder="Search..." />
        <ConversationList>
          {HARDCODED_CONVERSATIONS.map((conv) => (
            <Conversation
              key={conv.id}
              info={conv.info}
              lastSenderName={conv.lastSenderName}
              name={conv.name}
              active={conv.id === 1}
            >
              <Avatar
                name={conv.name}
                src={conv.avatar}
              />
            </Conversation>
          ))}
        </ConversationList>
      </Sidebar>

      <ChatContainer>
        <ConversationHeader>
          {/* 头部内容保持不变 */}
        </ConversationHeader>

        <MessageList typingIndicator={<TypingIndicator content="Zoe is typing" />}>
               
          {messages.map((msg) => (
            <Message            
              model={{              
                message: msg.message,
                sender: msg.sender,
                sentTime: msg.sentTime,
                direction: "incoming",
                position: "single"
              }}
            >
              {msg.position === "last" && msg.direction === "incoming" && (
                <Avatar
                  name={msg.sender}
                  src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
                />
              )}
            </Message>
          ))}
        </MessageList>

        <MessageInput placeholder="Type message here" />
      </ChatContainer>

      {/* 右侧侧边栏（保持不变） */}
      <Sidebar position="right">
        <ExpansionPanel open title="INFO">
          <p>AI 投资助手</p>
        </ExpansionPanel>
        {/* 其他扩展面板保持不变 */}
      </Sidebar>
    </MainContainer>
  );
};

export default ChatWindow;