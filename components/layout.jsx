import Navbar from "./navbar";
import SideBar from "./sidebar";

export default function Layout({ children }) {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row text-white">
      <div>
        <SideBar />
      </div>
      <div className="flex-1 relative max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 pb-10">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

// return (
//   <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row text-white">
//     <div className="relative hidden mr-10 sm:flex">
//       <SideBar />
//     </div>
//     <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/profile" element={<ProfilePage />} />
//         <Route path="/create-campaign" element={<CreateCampaingPage />} />
//         <Route path="/campaign-details/:id" element={<Campaigns />} />
//       </Routes>
//     </div>
//   </div>
// );
