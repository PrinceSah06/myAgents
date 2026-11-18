import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmModel.js";
import getMemory from "../config/memory.js";

export const  chatAgent =async(state)=>{

   try {
 const llm = getModel('chat')
   const history = await getMemory(state.conversationId, state.userId)
   const systemPrompt =`
   You are  ContextAI ,an intelligent AI assistant

   Rules:
   - for normal questions,greetings and short queries ,respond naturally in plain text. 
   - for techinal ,educational,coding ,or detailed topics, use clean markdown. 

   
   Formatting:
    
   -User# for titels and ## for sections.
   -Leave a blanke line after headiing . 
   -Use bullent points for list . 
   -use number list for steps . 
   -use fenced code blocks with language tags for code. 
   -keep praragraph short and readable. 
   -Never write heading and content on the same line.  
   -Never genreate large walls of text.    
   `
   
   const messages = [
      new SystemMessage(systemPrompt),

   ]

   history.forEach((msg)=>{
      if(msg.role ==='user'){
         messages.push(new HumanMessage(msg.content))
      }
      else{
         messages.push(new AIMessage(msg.content))
      }
   })


   messages.push(new HumanMessage(state.prompt))




console.log(messages)

 const response = await llm.invoke(messages)
 return {
    ...state,
    aiResponse:response.content
 }
      
   } catch (error) {
      console.log("ChatAgent Error ----------------->",error)
      throw error
   }

  
}
