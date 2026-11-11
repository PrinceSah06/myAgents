import React from 'react'
import { useSelector } from 'react-redux';

const MessageList = () => {

    const {selectedConversation}=useSelector(state =>state.conversation);
    const {messages}=useSelector(state =>state.message);

  return (
    <div className="flex-1 overflow-auto px-6 py-6 space-y-6 
     [scrollbar-width:none] [&::-webkit-scrollbar-width]:hidden">

{messages.length ===0 || !selectedConversation ? (<div className="
h-full flex flex-col items-center justify-center gap-4 text-center
">

</div>):
(<div
className="flex flex-col  gap-1.5">
    <h1>df</h1>

</div>)}
        
      
    </div>
  )
}

export default MessageList
