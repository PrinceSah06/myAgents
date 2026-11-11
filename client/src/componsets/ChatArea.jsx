import React, { useEffect } from 'react'
import Nav from './Nav';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import getMessages from '../features/getMessages';

const ChatArea = () => {
  const selectedConversation = useSelector(state => state.conversation.selectedConversation)
  const conversationId = selectedConversation?._id


  const dispatch = useDispatch()
  useEffect(() => {
    const getMsg = async () => {
      if (!conversationId) return

      const data = await getMessages(conversationId)
      dispatch(setMessages(data))
    }

    getMsg()
  }, [conversationId, dispatch])
  return (
    <div  className='flex-1 flex flex-col'>
      
    <Nav/>
      <MessageList/>
      <ChatInput/>
    </div>
  )
}

export default ChatArea
