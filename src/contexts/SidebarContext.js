import { useState, useContext, createContext } from 'react';
import { SortProvider } from './SortContext';
import { AuthProvider } from './AuthContext';

const SidebarContext = createContext({});

export function SidebarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {setOpen(true)};
  const handleDrawerClose = () => {setOpen(false)};
  // 
   const toggleDrawer = () => { //
    setOpen(!open); //
  };  //
  //
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  const closeSidebar = () => {
    setSidebarToggle(false);
  };

  return (
    <SidebarContext.Provider
      value={{ open, setOpen, handleDrawerOpen, handleDrawerClose,
        sidebarToggle, toggleSidebar, closeSidebar,
         toggleDrawer
       }}
    >
      <AuthProvider>
      <SortProvider>{children}</SortProvider>
      </AuthProvider>
    </SidebarContext.Provider>
  );
}

export function useSidebarContext() {
  return useContext(SidebarContext);
}