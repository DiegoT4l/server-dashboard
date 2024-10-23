import { useState } from 'react';
import { Play, Square, RotateCcw } from 'lucide-react';

const ServerManagement = () => {
  const [serverStatus, setServerStatus] = useState('running');

  const handleStart = () => {
    setServerStatus('running');
  };

  const handleStop = () => {
    setServerStatus('stopped');
  };

  const handleRestart = () => {
    setServerStatus('restarting');
    setTimeout(() => setServerStatus('running'), 3000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Server Management</h2>
      <div className="flex items-center mb-4">
        <div className="mr-4">Status:</div>
        <div className={`px-3 py-1 rounded-full text-white ${
          serverStatus === 'running' ? 'bg-green-500' :
          serverStatus === 'stopped' ? 'bg-red-500' :
          'bg-yellow-500'
        }`}>
          {serverStatus.charAt(0).toUpperCase() + serverStatus.slice(1)}
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
          onClick={handleStart}
          disabled={serverStatus === 'running'}
        >
          <Play className="mr-2" size={16} /> Start
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
          onClick={handleStop}
          disabled={serverStatus === 'stopped'}
        >
          <Square className="mr-2" size={16} /> Stop
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center"
          onClick={handleRestart}
        >
          <RotateCcw className="mr-2" size={16} /> Restart
        </button>
      </div>
    </div>
  );
};

export default ServerManagement;