import { useState } from 'react';
import { Terminal, Activity, HardDrive, Cpu, MemoryStick, Users, Shield, Archive, FileText, AlertTriangle } from 'lucide-react';
import ServerLogs from './components/ServerLogs.tsx';
import ServerManagement from './components/ServerManagement';
import WebTerminal from './components/WebTerminal';
import ServerStats from './components/ServerStats';
import ServerSpecs from './components/ServerSpecs';
import ResourceMonitoring from './components/ResourceMonitoring';
import ProcessManagement from './components/ProcessManagement';
import UserActivity from './components/UserActivity';
import SecurityEvents from './components/SecurityEvents';
import BackupManagement from './components/BackupManagement';
import ErrorLogs from './components/ErrorLogs';
import FileExplorer from './components/FileExplorer';

function App() {
  const [activeTab, setActiveTab] = useState('stats');

  const tabs = [
    { id: 'stats', name: 'Server Stats', icon: Activity },
    { id: 'logs', name: 'Server Logs', icon: FileText },
    { id: 'errors', name: 'Error Logs', icon: AlertTriangle },
    { id: 'management', name: 'Server Management', icon: Cpu },
    { id: 'terminal', name: 'Web Terminal', icon: Terminal },
    { id: 'specs', name: 'Server Specs', icon: HardDrive },
    { id: 'resources', name: 'Resource Monitoring', icon: MemoryStick },
    { id: 'processes', name: 'Process Management', icon: Activity },
    { id: 'users', name: 'User Activity', icon: Users },
    { id: 'security', name: 'Security Events', icon: Shield },
    { id: 'backup', name: 'Backup Management', icon: Archive },
    { id: 'files', name: 'File Explorer', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Linux Server Monitoring Dashboard</h1>
      </header>
      <div className="flex">
        <nav className="w-64 bg-gray-800 text-white h-screen overflow-y-auto">
          <ul className="p-4">
            {tabs.map((tab) => (
              <li key={tab.id} className={`mb-2 ${activeTab === tab.id ? 'bg-blue-600' : ''}`}>
                <button
                  className="flex items-center w-full p-2 rounded"
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="mr-2" size={16} /> {tab.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <main className="flex-1 p-8 overflow-y-auto">
          {activeTab === 'stats' && <ServerStats />}
          {activeTab === 'logs' && <ServerLogs />}
          {activeTab === 'errors' && <ErrorLogs />}
          {activeTab === 'management' && <ServerManagement />}
          {activeTab === 'terminal' && <WebTerminal />}
          {activeTab === 'specs' && <ServerSpecs />}
          {activeTab === 'resources' && <ResourceMonitoring />}
          {activeTab === 'processes' && <ProcessManagement />}
          {activeTab === 'users' && <UserActivity />}
          {activeTab === 'security' && <SecurityEvents />}
          {activeTab === 'backup' && <BackupManagement />}
          {activeTab === 'files' && <FileExplorer />}
        </main>
      </div>
    </div>
  );
}

export default App;