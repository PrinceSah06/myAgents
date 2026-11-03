 
import api from '.././utils/axios'

export const createConversation= async()=>{

    try {
        
        const data =await api.get("/api/chat/create-conversation");

        console.log('data form create  conversation',data)

        
        return data.data
    } catch (error) {
        console.log("error while create conversation in feature : ",error)
        return[]
    }


}

// 5:51:26