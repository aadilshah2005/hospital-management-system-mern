import {
  LayoutDashboard,
  CalendarDays,
  Users,
  ClipboardList,
  FileText,
  Pill,
  Bell,
  Settings,
} from "lucide-react";

function DoctorSidebar() {
  return (
    <aside className="fixed top-0 left-0 z-50 w-60 md:w-64 h-screen bg-[#111827] border-r border-gray-800 text-white flex flex-col overflow-hidden">
      <div className="h-16 min-h-16 flex items-center px-4 md:px-6 border-b border-gray-800">
        <h1 className="text-lg md:text-2xl font-bold text-cyan-400 truncate">
          Doctor Panel
        </h1>
      </div>

      <div className="flex-1 p-3 md:p-4 space-y-2">
        <p className="text-[10px] md:text-xs uppercase text-gray-400 mb-3">
          Main Menu
        </p>

        <SidebarItem
          icon={<LayoutDashboard size={18} />}
          text="Dashboard"
          active
        />

        <SidebarItem icon={<CalendarDays size={18} />} text="Appointments" />

        <SidebarItem icon={<Users size={18} />} text="Patients" />

        <SidebarItem icon={<ClipboardList size={18} />} text="Prescriptions" />

        <SidebarItem icon={<FileText size={18} />} text="Medical Reports" />

        <SidebarItem icon={<Pill size={18} />} text="Medicines" />

        <SidebarItem icon={<Bell size={18} />} text="Notifications" />

        <SidebarItem icon={<Settings size={18} />} text="Settings" />
      </div>
    </aside>
  );
}

function SidebarItem({ icon, text, active }) {
  return (
    <button
      className={`
      w-full flex items-center gap-2 md:gap-3
      px-3 md:px-4 py-2.5 md:py-3
      rounded-xl transition-all duration-200
      ${
        active
          ? "bg-cyan-500 text-black font-semibold"
          : "text-gray-300 hover:bg-gray-800 hover:text-white"
      }
      `}
    >
      {icon}

      <span className="text-xs md:text-sm whitespace-nowrap">{text}</span>
    </button>
  );
}

export default DoctorSidebar;
