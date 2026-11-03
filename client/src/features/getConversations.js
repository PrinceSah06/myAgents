 
import api from '.././utils/axios'
import { setConversations } from '../redux/conversationSlice';

export const getConversations= async()=>{

    try {
        
        const data =await api.get("/api/chat/get-conversations");

        console.log('data form get  conversation',data)

        return data.data
        
    } catch (error) {
        console.log("error while get conversation in feature : ",error)
        return []
    }


}

// 5:51:26