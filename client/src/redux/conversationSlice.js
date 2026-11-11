import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const ConversationSlice = createSlice({
  name: "conversation",
  initialState: { conversatins: []
    ,selectedConversation:null
   },
  reducers: {

    setConversations:(state,action)=>{
        state.conversatins= action.payload
        if (!state.selectedConversation && action.payload.length > 0) {
            state.selectedConversation = action.payload[0]
        }
    }
,

    addConversation:(state,action)=>{
        state.conversatins.unshift( action.payload)
    }

    , setSelectConversation:(state,action)=>{
        state.selectedConversation =( action.payload)
    }




    

  },
});

export const {  setConversations,addConversation ,setSelectConversation} = ConversationSlice.actions;
export default ConversationSlice.reducer;
