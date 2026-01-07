import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './views/Dashboard';
import { StudentList } from './views/StudentList';
import { CMSView } from './views/CMSView';
import { ModuleType, UserRole } from './types';
import { Lock } from 'lucide-react';

const PlaceholderView = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-full text-gray-400 border-2 border-dashed border-gray-300 rounded-lg">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p>Module implementation pending full data migration.</p>
  </div>
);

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<ModuleType>(ModuleType.DASHBOARD);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(UserRole.ADMIN);

  const renderContent = () => {
    switch (currentModule) {
      case ModuleType.DASHBOARD:
        return <Dashboard />;
      case ModuleType.ENROLMENT:
      case ModuleType.STUDENT_ADMIN:
        // Reusing Student List for multiple modules in this prototype to show data handling
        return <StudentList />;
      case ModuleType.CMS:
        if (currentUserRole === UserRole.LECTURER) {
           // Security Fallback in case UI didn't catch it
           return (
             <div className="flex flex-col items-center justify-center h-full text-red-600">
               <Lock size={64} className="mb-4" />
               <h1 className="text-2xl font-bold">Access Denied</h1>
               <p className="mt-2 text-gray-600">You do not have the required security clearance (CMS) for this module.</p>
             </div>
           );
        }
        return <CMSView />;
      default:
        return <PlaceholderView title={currentModule} />;
    }
  };

  return (
    <Layout 
      currentModule={currentModule} 
      setCurrentModule={setCurrentModule}
      currentUserRole={currentUserRole}
      setCurrentUserRole={setCurrentUserRole}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
