import { getModel } from "../config/llmModel.js";

 const  router = async (state) => {
  const llm = getModel("router");

  const prompt = ` You are an agent router

    Available agents :

    -chat
    -serach
    -coding
    -pdf
    -ppt
    -vision

    Rules:

    chat: General conversation,
    explanations,learning,questions


    serach:
    Current events,
    latest Informantion, recent developments, internet lookup,



    coding: Generate code , debug code , build projects,architecture,api design,


    pdf : Questions about generate PDFs, or doucmets contexts.


    ppt:Questions about generate ppts or ppt context 


    vision : geneate images ,crate image 

    return only one Word:

    chat 
    search
    pdf
    coding
    ppt 
    vision

    User Query :${state.prompt}
    `;

  const response = await llm.invoke(prompt);

  console.log("ai Router agent resopnse :", response)

  return {
    ...state,
    agent: response.content.trim().toLowerCase(),
  };
};

export default router