import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

import AppContent from "../../context/AppContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export function SiteHeader() {

  const { userData } = useContext(AppContent);

  const roleLabels = {
    admin: "Admin",
    faculty: "Faculty",
    hte: "HTE",
    student: "Student",
  }

  const navigate = useNavigate();

  return (
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium"> {roleLabels[userData?.role?.toLowerCase()] ?? "Guest"} Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
          {!userData?.isAccountVerified && (
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex" onClick={() => navigate("/verify-email")}>
              Verify Email
          </Button>
          )}
        </div>
      </div>
    </header>
  );
}
