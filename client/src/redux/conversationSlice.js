import { createSlice } from "@reduxjs/toolkit";
const ConversationSlice = createSlice({
  name: "conversation",
  initialState: { conversations: [], selectedConversation: null },
  reducers: {

    setConversations:(state,action)=>{
        state.conversations = action.payload
        if (state.selectedConversation) {
            state.selectedConversation = action.payload.find(
              (conversation) => conversation._id === state.selectedConversation._id,
            ) ?? action.payload[0] ?? null;
        } else {
            state.selectedConversation = action.payload[0] ?? null;
        }
    }
,

    addConversation:(state,action)=>{
        state.conversations.unshift(action.payload)
        state.selectedConversation = action.payload
    }

    , setSelectConversation:(state,action)=>{
        state.selectedConversation =( action.payload)
    }




    

  },
});

export const {  setConversations,addConversation ,setSelectConversation} = ConversationSlice.actions;
export default ConversationSlice.reducer;
