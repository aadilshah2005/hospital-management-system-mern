import DoctorSidebar from "../../pages/doctor/DoctorSidebar";
import DoctorHeader from "../../components/doctor/DoctorHeader";
import { Outlet } from "react-router-dom";

function DoctorLayout() {
  return (
    <div className="h-screen overflow-hidden bg-[#0B1120] flex">
      <div className="hidden md:block fixed top-0 left-0 h-screen w-64 z-50">
        <DoctorSidebar />
      </div>

      <div className="flex-1 md:ml-64 flex flex-col h-screen">
        <div className="fixed top-0 left-0 md:left-64 right-0 z-40">
          <DoctorHeader />
        </div>

        <main className="mt-16 flex-1 overflow-y-auto bg-[#0B1120] p-4 md:p-6 text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DoctorLayout;
