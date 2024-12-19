
import Sidebar from "./Sidebar";
import NoChatSelected from "./NoChatSelected";
import ChatContainer from "./ChatContainer";
import { useSelector } from "react-redux";

const HomePage = () => {
  const selectedUser = useSelector(state => state.message.selectedUser  ) 

  return (
    <div className="h-screen bg-base-200 mb-12">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
           
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
