import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  GraduationCap, 
  DollarSign, 
  CalendarCheck, 
  FileText, 
  ShieldAlert, 
  LogOut,
  Menu,
  ShieldCheck,
  UserCircle
} from 'lucide-react';
import { ModuleType, UserRole } from '../types';

interface LayoutProps {
  currentModule: ModuleType;
  setCurrentModule: (m: ModuleType) => void;
  currentUserRole: UserRole;
  setCurrentUserRole: (r: UserRole) => void;
  children: React.ReactNode;
}

const SidebarItem = ({ 
  label, 
  icon: Icon, 
  active, 
  onClick, 
  restricted 
}: { 
  label: string; 
  icon: any; 
  active: boolean; 
  onClick: () => void;
  restricted?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={restricted}
    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors duration-200
      ${active 
        ? 'bg-tp-red text-white border-r-4 border-white' 
        : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
      ${restricted ? 'opacity-50 cursor-not-allowed' : ''}
    `}
  >
    <Icon size={20} />
    <span>{label}</span>
    {restricted && <ShieldAlert size={14} className="ml-auto text-yellow-500" />}
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ 
  currentModule, 
  setCurrentModule, 
  currentUserRole,
  setCurrentUserRole,
  children 
}) => {
  
  // RBAC Logic: Lecturers cannot see CMS
  const isCMSAccessible = currentUserRole !== UserRole.LECTURER;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-tp-dark shadow-xl flex flex-col">
        <div className="p-6 border-b border-gray-700 flex items-center space-x-2">
          <div className="w-8 h-8 bg-tp-red rounded flex items-center justify-center font-bold text-white">TP</div>
          <span className="text-white font-bold text-lg tracking-tight">ESMS & CMS</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Core Modules</div>
          <SidebarItem 
            label="Dashboard" 
            icon={LayoutDashboard} 
            active={currentModule === ModuleType.DASHBOARD} 
            onClick={() => setCurrentModule(ModuleType.DASHBOARD)} 
          />
          <SidebarItem 
            label="Enrolment" 
            icon={Users} 
            active={currentModule === ModuleType.ENROLMENT} 
            onClick={() => setCurrentModule(ModuleType.ENROLMENT)} 
          />
           <SidebarItem 
            label="Course Mgmt" 
            icon={BookOpen} 
            active={currentModule === ModuleType.COURSE_MGMT} 
            onClick={() => setCurrentModule(ModuleType.COURSE_MGMT)} 
          />
           <SidebarItem 
            label="Student Admin" 
            icon={UserCircle} 
            active={currentModule === ModuleType.STUDENT_ADMIN} 
            onClick={() => setCurrentModule(ModuleType.STUDENT_ADMIN)} 
          />
           <SidebarItem 
            label="Student Finance" 
            icon={DollarSign} 
            active={currentModule === ModuleType.FINANCE} 
            onClick={() => setCurrentModule(ModuleType.FINANCE)} 
          />
           <SidebarItem 
            label="Attendance" 
            icon={CalendarCheck} 
            active={currentModule === ModuleType.ATTENDANCE} 
            onClick={() => setCurrentModule(ModuleType.ATTENDANCE)} 
          />
           <SidebarItem 
            label="Assessment" 
            icon={GraduationCap} 
            active={currentModule === ModuleType.ASSESSMENT} 
            onClick={() => setCurrentModule(ModuleType.ASSESSMENT)} 
          />

          <div className="mt-6 px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center justify-between">
            <span>Restricted</span>
            <ShieldCheck size={12} className="text-green-500" />
          </div>
          <SidebarItem 
            label="Case Management" 
            icon={FileText} 
            active={currentModule === ModuleType.CMS} 
            onClick={() => isCMSAccessible && setCurrentModule(ModuleType.CMS)}
            restricted={!isCMSAccessible}
          />
        </div>

        <div className="p-4 border-t border-gray-700">
           <div className="flex items-center space-x-3 text-gray-400 text-sm">
              <LogOut size={16} />
              <span>v1.0.4 (Prod)</span>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 z-10">
          <div className="flex items-center text-gray-800 text-xl font-semibold">
            {currentModule}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-end mr-2">
               <span className="text-xs text-gray-500 uppercase font-bold">Simulate Role</span>
               <select 
                  className="text-sm border-none bg-gray-100 rounded px-2 py-1 focus:ring-2 focus:ring-tp-red cursor-pointer"
                  value={currentUserRole}
                  onChange={(e) => setCurrentUserRole(e.target.value as UserRole)}
               >
                 {Object.values(UserRole).map(role => (
                   <option key={role} value={role}>{role}</option>
                 ))}
               </select>
            </div>
            
            <div className="h-8 w-8 rounded-full bg-tp-red text-white flex items-center justify-center font-bold">
               {currentUserRole.charAt(0)}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
