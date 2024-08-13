import { useState, useRef, useEffect } from "react";
import MenuButton from "./MenuButton";
import SideBarPatient from "./SideBarPatient";
import Logout from "../../../components/Logout/Logout";
import UserInitials from "../../../components/UserInitials";

const LateralMenu = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const profileRef = useRef(null);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleLogout = () => setShowLogout((prev) => !prev);

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current && sidebarRef.current.contains(event.target)
    ) {
      return; 
    }

    if (
      profileRef.current && !profileRef.current.contains(event.target)
    ) {
      setShowLogout(false);
    }
    
    setSidebarOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main>
      <nav className="flex justify-between w-full pt-6">
        <MenuButton onToggleSidebar={toggleSidebar} />
        <div ref={profileRef} className="relative">
          <UserInitials onClick={toggleLogout} />
          {showLogout && (
            <div className="absolute mt-2 right-0 z-10">
              <Logout />
            </div>
          )}
        </div>
      </nav>
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-gray-300 dark:bg-[#0007] bg-opacity-80 z-40 flex">
          <div ref={sidebarRef} className="relative">
            <SideBarPatient />
            <button
              onClick={toggleSidebar}
              className="absolute top-4 right-4 text-4xl text-gray-900"
            >
              x
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default LateralMenu;
