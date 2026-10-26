import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const createConversation = async (req, res) => {
  try {
    const userId = req.header["x-user-id"];

    console.log("user id  form headers:", userId);

    const conversation = await Conversation.create({
      userId,
    });

    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json({
      message: "Error while Creating Conversation  :",
      error,
    });
  }
};




export const  getConversations = async(req , res )=>{
    try {
    const userId = req.header["x-user-id"];

    console.log("user id  form headers:", userId);

    const conversation = await Conversation.find({
      userId,
    }).sort({updatedAt:-1});

    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json({
      message: "Error while getting  Conversation  :",
      error,
    });
  }
}



export const  updateConversation = async(req , res )=>{
    try {
      const {id,title}  = req.body;


    

    const conversation = await Conversation.findByIdAndUpdate(id,{title});

    

    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json({
      message: "Error while getting  Conversation  :",
      error,
    });
  }
}



export const saveMessage = async (req , res)=>{

    try {
        
        const {conversationId,role, content}= req.body;


        const message = await Message.create({
            content, conversationId, role
        });


        return res.status(200).json({message})
    } catch (error) {
        return res.status(500).json({error:"Error while saving Message : ",error})
        
    }
}

export const getMessage = async (req ,res)=>{
  try {
    
    const {conversationId} =req.params.conversationId

    const messages = await Message.find({conversationId
    }).sort({createdAt:-1})

    return res.status(200).json(messages)
  } catch (error) {
    return res.status(500).json({message:"get messages error :",error})
  }
}




// 3:41:44