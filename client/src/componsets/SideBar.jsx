import { MessageSquare, PanelLeftIcon, PenBoxIcon, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getConversations } from "../features/getConversations";
import { useDispatch, useSelector } from "react-redux";
import {
  addConversation,
  setConversations,
  setSelectConversation,
} from "../redux/conversationSlice";
import { createConversation } from "../features/createConversation";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { conversatins: conversations = [], selectedConversation = null } =
    useSelector((state) => state.conversation);

  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const[ImageError,setImageError]=useState(false)

  useEffect(() => {
    const getConv = async () => {
      const data = await getConversations();

      dispatch(setConversations(Array.isArray(data) ? data : []));
    };

    getConv();
  }, []);

  const handleCreateConversation = async () => {
    const data = await createConversation();

    if (data && !Array.isArray(data)) {
      dispatch(addConversation(data));
    }
  };

  return (
    <div className="fixed  lg:static inset-y-0 left-0 z-50 w-[270px] h-screen shrink-0 bg-[#0d0f14] border-white/[0.06]">
      <div className="flex flex-col h-full">
        <div className="header flex items-center  gap-2.5 py-4 border-b border-white/[0.06]">
          {/* // set hidden  */}
          <div
            className="panel hidde lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 
        hover:text-slate-200 hover:bg-white/[0.05]  transition-colors duration-150 bg-transparent
        border-none cursor-pointer"
            onClick={() => setCollapsed(true)}
          >
            <PanelLeftIcon />
          </div>
          <span
            className="text-[16px] font-semibold text-slate-100 tracking-tight
         flex-1"
          >
            Multi Chat{" "}
          </span>
          <span
            className="text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 
        px-2 py-0.5 rounded-full tracking-wide"
          >
            free
          </span>

          <button
            className="pen flex items-center justify-center w-7 h-7 
        rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] 
        transition-colors duration-150 bg-transparent border-none cursor-pointer"
            onClick={handleCreateConversation}
          >
            <PenBoxIcon size={14} />
          </button>
        </div>

        <div className="px-4 pt-4 pb-1">
          <button
            className=" w-full flex items-center justify-center gap-2  text-sm font-medium text-white
    bg-gradient-to-br from-indigo-500 to-violet-700 rounded-xl py-[10px] border-none cursor-pointer 
    hover:opacity-90 transition-opacity duration-150"
            onClick={handleCreateConversation}
          >
            <Plus size={15} />
            New Chat
          </button>
        </div>

        {/* // conversation div */}

        {conversations.length === 0 ? (
          <div
            className="text-slate-600 px-5 pt-4 pb-1.5
       text-[10.5px] font-semibold uppercase tracking-widest "
          >
            NO Recent Conversatins
          </div>
        ) : (
          <div
            className="text-slate-600 px-5 pt-4 pb-1.5
       text-[10.5px] font-semibold uppercase tracking-widest "
          >
            Recent
          </div>
        )}

        <div
          className="flex-1 overflow-y-hidden px-2.5 pb-2 [scrollbar-width:none] [7::-webkit-scrollbar]:hidden
      "
        >
          {conversations.map((conv, i) => {
            const isActive = selectedConversation?._id === conv?._id;

            return (
              <div
                onClick={() => dispatch(setSelectConversation(conv))}
                key={conv?._id ?? i}
                className={`flex items-center gap-2.5 cursor-pointern mb-0.5 px-3 py-2.5 rounded-[10px]
                border transition-colors duration-150 ${isActive ? "bg-indigo-500/10  border-indigo-500/[0.18" : "bg-transparent border-transparent"}
                
                `}
              >
                <div
                  className={`flex items-center gap-2.5 cursor-pointern mb-0.5 px-3 py-2.5 rounded-[10px]
                border transition-colors duration-150 ${isActive ? "bg-indigo-500/10  border-indigo-500/[0.18" : "bg-transparent border-transparent"}
                
                `}
                >
                  <MessageSquare size={13} />
                </div>
                <span
                  className={`text-[13px] font-medium truncate${isActive ? "text-slate-100" : "text-slate-300"}`}
                >
                  {conv?.title || "New Chat"}
                </span>
              </div>
            );

            // 6:24h
          })}
        </div>

        {/* footer */}

        <div className="mx-2.5 h-px bg-white/[0.6]" />

        <div className="footer px-3.5 py3.5">
          {userData ? <div className="flex items-center gap-2.5 cursor-pointer rounded-xl px-3
          py-2.5 hover:bg-white/[0.05] transition-colors duration-150">
            <div  className="relative shrink-0">
              {
                (userData?.avatar || !ImageError)? <img src={userData?.avatar} alt="image"  onError={()=>{setImageError(true)}}></img>
                : <div> <User/></div>

              }
            </div>

            6:32
          </div> 
          : 
          <button className="text-white">Login</button>}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
