"use client";

import { Button } from "@/components/ui/button";
import { Nav } from "@/components/ui/nav";
import {
  ChevronLeft,
  ChevronRight,
  FormInput,
  Heart,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import React, { useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { logoutUser } from "../firebase/auth/auth";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // For responsiveness
  const { width } = useWindowSize();
  const mobileWidth = width < 768;

  function toggleSidebar() {
    setIsCollapsed((prev) => !prev);
  }

  return (
    <>
      <div className="relative left-0 top-0 min-w-screen border-r pt-12">
        {!mobileWidth ? (
          <Button
            onClick={toggleSidebar}
            variant={"ghost"}
            className="absolute -right-5 border top-0 rounded-full p-2 mt-2 transition-all bg-slate-100"
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        ) : null}

        <Nav
          isCollapsed={mobileWidth ? true : isCollapsed}
          links={[
            {
              title: "Dashboard",
              icon: LayoutDashboard,
              href: "/dashboard/users",
              variant: "ghost",
            },
            {
              title: "Create",
              icon: FormInput,
              href: "/dashboard/form",
              variant: "ghost",
            },
            {
              title: "Favourites",
              icon: Heart,
              href: "/dashboard/favourites",
              variant: "ghost",
            },
          ]}
          buttons={[
            {
              title: "LogOut",
              icon: LogOut,
              variant: "ghost",
              fn: () => logoutUser(),
            },
          ]}
        />
      </div>
    </>
  );
};

export default Sidebar;
