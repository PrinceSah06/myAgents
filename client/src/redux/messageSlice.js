import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const messageSlice = createSlice({
  name: "message",
  initialState: { messages: []
    ,
   },
  reducers: {

    setMessages:(state,action)=>{
        state.messages= action.payload
    }
,
addMessage:(state,action)=>{
  state.messages.push(action.payload)
}

   



    

  },
});

export const { addMessage,  setMessages} = messageSlice.actions;
export default messageSlice.reducer;
