import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      } else {
        setIsDesktopOpen(false);
        setIsMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sidebar Menu Items
  const menuItems = [
    { name: "Dashboard", icon: "fa-house", path: "/" },
    { name: "Daily", icon: "fa-calendar-day", path: "/daily" },
    { name: "Air Quality", icon: "fa-wind", path: "/airQuality" },
    { name: "Settings", icon: "fa-gear", path: "/settings" },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden absolute top-4 left-4 z-50 text-white text-2xl"
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      {/* Mobile Overlay , Overlay = a layer on top of content, usually semi-transparent, to highlight or block interaction with the background*/}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        ></div>
      )}

      {/* Sidebar Container */}
      <div
          onMouseEnter={() => setIsDesktopOpen(true)}
          onMouseLeave={() => setIsDesktopOpen(false)}
        className={`
          fixed top-0 left-0 bottom-0 z-50 p-1 rounded-r-4xl border
          bg-[rgba(15,23,42,0.9)] md:bg-[rgba(15,23,42,0.4)]
          border-[rgba(255,255,255,0.1)] backdrop-blur-[20px]
          transition-all duration-300 ease-in-out 
          ${isMobileOpen ? "translate-x-0 w-50" : "-translate-x-[130%] md:translate-x-0"} 
          ${isDesktopOpen ? "md:w-45 md:top-5 md:left-5 md:bottom-5 md:rounded-4xl" : "md:w-15 md:top-5 md:left-5 md:bottom-5 md:rounded-4xl"}
        `}
      >
        {/* Mobile Close Button */}
        {isMobileOpen && (
          <div className="flex justify-end m-2 md:hidden">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="text-white text-xl"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        )}

      
       {/* Sidebar Menu */}
       <div className={`flex justify-center`}>
        <ul className="text-white space-y-4 text-lg">
            {menuItems.map((item, index) => (
              <li key={item.name}
                className={
                      index === menuItems.length - 1
                        ? "fixed bottom-8"   // separate styling
                        : ""
                    }
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center mt-5 gap-3 pl-2.5 p-2 rounded-xl hover:bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.2),transparent_70%)]
                  ${isDesktopOpen? "md:pr-6":""}
                  ${isActive 
                        ? "text-indigo-500 bg-indigo-500/10  hover:text-white" 
                        : "text-gray-300 hover:text-white"
                      }`
                  }
                >
                  <i className={`fa-solid ${item.icon}`}></i>
                  {(isDesktopOpen || isMobileOpen) && <span className="text-sm">{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
       </div>
      </div>
    </>
  );
}

export default Sidebar;





























// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";

// function Sidebar() {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isOpenMobile, setIsOpenMobile] = useState(false);

//   // Auto close sidebar on small screens

//    useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setIsDesktopOpen(true);
//         setIsMobileOpen(false);
//       } else {
//         setIsDesktopOpen(false);
//         setIsMobileOpen(false);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <>
//       {/* Mobile Hamburger Button */}
//       <button
//         onClick={() => setIsOpenMobile(true)}
//         className="md:hidden fixed top-4 left-4 z-50 text-white text-2xl"
//       >
//         <i className="fa-solid fa-bars"></i>
//       </button>

//       {/* Overlay (Mobile Only) */}
//       {isOpenMobile && (
//         <div
//           onClick={() => setIsOpenMobile(false)}
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
//         ></div>
//       )}

//        {/* Sidebar */}
//       <div
//         className={`
//           fixed md:static top-0 left-0 z-50 h-full
//           bg-[rgba(15,23,42,0.9)] md:bg-[rgba(15,23,42,0.4)]
//           border border-[rgba(255,255,255,0.1)] backdrop-blur-[20px]
//           p-4 rounded-4xl transition-all duration-300
//           ${isOpenMobile ? "translate-x-0 w-50" : "-translate-x-full md: md:translate-x-0"}   
//           ${isOpen ? "w-50" : "w-18"}
//         `}
//       >
//         {/* Close Button (Mobile Only) */}
//         {isOpenMobile && (
//           <div className="flex justify-end mb-8 md:hidden">
//           <button
//             onClick={() => setIsOpenMobile(false)}
//             className="text-white text-xl"
//           >
//             <i className="fa-solid fa-xmark"></i>
//           </button>
//         </div>
//         )}

//         {/* Toggle Button (Desktop Only) */}
//         {!isOpenMobile && (
//           <div className="flex justify-end mb-6">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-white text-xl"
//             >
//               <i
//                 className={`fa-solid ${
//                   isOpen ? "fa-angle-left" : "fa-angle-right"
//                 }`}
//               ></i>
//             </button>
//           </div>
//         )}

//         {/* Sidebar Menu */}
//         <ul className="text-white space-y-4 text-lg">
//           <li>
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 p-2 rounded ${
//                   isActive
//                     ? "bg-white text-[#175d9f]"
//                     : "hover:text-yellow-300"
//                 }`
//               }
//             >
//               <i className="fa-solid fa-house"></i>
//               {isOpen && <span>Dashboard</span>}
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/daily"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 p-2 rounded ${
//                   isActive
//                     ? "bg-white text-[#175d9f]"
//                     : "hover:text-yellow-300"
//                 }`
//               }
//             >
//               <i className="fa-solid fa-calendar-day"></i>
//               {isOpen && <span>Daily</span>}
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/airQuality"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 p-2 rounded ${
//                   isActive
//                     ? "bg-white text-[#175d9f]"
//                     : "hover:text-yellow-300"
//                 }`
//               }
//             >
//               <i className="fa-solid fa-wind"></i>
//               {isOpen && <span>Air Quality</span>}
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/settings"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 p-2 rounded ${
//                   isActive
//                     ? "bg-white text-[#175d9f]"
//                     : "hover:text-yellow-300"
//                 }`
//               }
//             >
//               <i className="fa-solid fa-gear"></i>
//               {isOpen && <span>Settings</span>}
//             </NavLink>
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// }

// export default Sidebar;






