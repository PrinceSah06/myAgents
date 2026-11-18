import api from '../utils/axios';

const  sendMessage =  async(payload) => {

    try {
         const {data} = await api.post('/api/agent/chat',payload);

         console.log("OUt put from ai IN sendMessagess feature",data)
         return data

         
    } catch (error) {

        console.log("Error while calling sendMessage Feature ,",error)
        return null
    }
 
}

export default sendMessage
