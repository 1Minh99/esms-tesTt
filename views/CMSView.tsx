import React, { useState } from 'react';
import { MOCK_STUDENTS } from '../mockData';
import { Lock, Shield, Search, AlertCircle, FileText, Activity } from 'lucide-react';
import { SensitiveData } from '../components/SensitiveData';
import { Student } from '../types';

export const CMSView: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Filter students with records for demo
  const studentsWithRecords = MOCK_STUDENTS.filter(s => s.cmsRecords.length > 0 || s.riskLevel !== 'Low');

  return (
    <div className="h-full flex flex-col space-y-4">
      
      {/* Security Banner (Part 2 Section D) */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded shadow-sm">
        <div className="flex">
          <div className="flex-shrink-0">
            <Lock className="h-5 w-5 text-amber-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-amber-700">
              <span className="font-bold">SECURE ZONE:</span> This is the Case Management System (CMS). All data displayed here is classified <strong>Sensitive High</strong>. 
              Field-level encryption (AES-256) is active. All access is logged for audit.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        
        {/* Student List Sidebar */}
        <div className="w-1/3 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
             <div className="relative">
                <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search Cases..." 
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-tp-red"
                />
             </div>
          </div>
          <div className="flex-1 overflow-y-auto">
             {studentsWithRecords.map(student => (
               <div 
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors
                    ${selectedStudent?.id === student.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}
                  `}
               >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{student.name}</h4>
                      <p className="text-xs text-gray-500">{student.id}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold
                      ${student.riskLevel === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}
                    `}>
                      {student.riskLevel} Risk
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-gray-400 flex items-center">
                    <FileText size={12} className="mr-1" />
                    {student.cmsRecords.length} Active Records
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Detail View */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-y-auto p-6">
          {selectedStudent ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                   <h2 className="text-xl font-bold text-gray-900">{selectedStudent.name}</h2>
                   <div className="flex items-center space-x-4 mt-1">
                     <span className="text-sm text-gray-500">ID: {selectedStudent.id}</span>
                     <span className="text-sm text-gray-500">Course: {selectedStudent.course}</span>
                   </div>
                </div>
                <div className="flex space-x-2">
                   <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">View Audit Log</button>
                   <button className="px-3 py-1.5 bg-tp-red text-white rounded text-sm hover:bg-red-700">Add Case Note</button>
                </div>
              </div>

              {/* Secure Biodata */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <Shield size={14} className="mr-2 text-blue-600" />
                  Sensitive Biodata
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <SensitiveData label="NRIC / FIN" value={selectedStudent.nric} isEncrypted={true} />
                  <SensitiveData label="Home Address" value="Blk 123 Tampines St 11 #04-123" isEncrypted={true} />
                  <SensitiveData label="Personal Email" value="student.private@email.com" />
                  <SensitiveData label="Phone Number" value="+65 9123 4567" />
                </div>
              </div>

              {/* Case Records */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                   Case History
                   <span className="ml-2 text-xs font-normal text-gray-500 px-2 py-0.5 bg-gray-100 rounded-full">Encrypted Storage</span>
                </h3>
                
                <div className="space-y-4">
                  {selectedStudent.cmsRecords.map(record => (
                    <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                       <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                             <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase
                                ${record.type === 'Disciplinary' ? 'bg-red-100 text-red-700' : 
                                  record.type === 'Medical' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}
                             `}>
                               {record.type}
                             </span>
                             <span className="text-sm text-gray-500">{record.date}</span>
                          </div>
                          <span className="text-xs text-gray-400 font-mono">{record.id}</span>
                       </div>
                       
                       <div className="mb-3">
                          <SensitiveData label="Case Summary" value={record.summary} isEncrypted={true} />
                       </div>

                       <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                          <div className="flex items-center">
                            <Activity size={12} className="mr-1" />
                            Officer: {record.officer}
                          </div>
                          <div className="flex items-center text-green-600" title="Data Integrity Verified">
                             <Lock size={10} className="mr-1" />
                             AES-256
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
             <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <Shield size={48} className="mb-4 opacity-50" />
                <p>Select a student case to view sensitive details.</p>
                <p className="text-xs mt-2">All views are audited.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
