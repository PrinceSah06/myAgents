import axios from "axios";

export const getMessages = async (convId, userId)=>{


    try {

        const {data} = await axios.get(`${process.env.CHAT_SERVICE.replace(/\/$/, "")}/get-messages/${convId}`,{
          headers: { "x-user-id": userId },
        })

        return data
        
    } catch (error) {
        
        console.log('Error whiel get messages,:',error)
        throw error
    }

}

830
