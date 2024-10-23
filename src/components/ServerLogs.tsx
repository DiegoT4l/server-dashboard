import { useState, useEffect, useRef } from 'react';

const ServerLogs = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [filter, setFilter] = useState('');
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLogs = () => {
      // In a real application, this would be an API call to fetch server logs
      const newLog = `[${new Date().toISOString()}] ${Math.random().toString(36).substring(7)}: ${generateRandomLogMessage()}`;
      setLogs(prevLogs => [newLog, ...prevLogs].slice(0, 1000));
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const generateRandomLogMessage = () => {
    const messages = [
      'User logged in',
      'File uploaded',
      'Database backup completed',
      'CPU usage spike detected',
      'Memory usage high',
      'Disk space running low',
      'Network connection established',
      'Server restarted',
      'Security update installed',
      'New user account created'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const filteredLogs = logs.filter(log => log.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Server Logs</h2>
      <input
        type="text"
        placeholder="Filter logs..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-[calc(100vh-20rem)] overflow-y-auto font-mono text-sm">
        {filteredLogs.map((log, index) => (
          <div key={index} className="mb-1">
            {log}
          </div>
        ))}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
};

export default ServerLogs;