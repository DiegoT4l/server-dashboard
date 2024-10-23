import { useState, useEffect } from 'react';

interface Process {
  pid: number;
  name: string;
  cpu: number;
  memory: number;
}

const ProcessManagement = () => {
  const [processes, setProcesses] = useState<Process[]>([]);

  useEffect(() => {
    const fetchProcesses = () => {
      // In a real application, this would be an API call to fetch server processes
      const newProcesses: Process[] = Array.from({ length: 10 }, (_, i) => ({
        pid: Math.floor(Math.random() * 10000),
        name: `process-${i}`,
        cpu: Math.random() * 100,
        memory: Math.random() * 1000,
      }));
      setProcesses(newProcesses);
    };

    fetchProcesses();
    const interval = setInterval(fetchProcesses, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleKillProcess = (pid: number) => {
    setProcesses(processes.filter(p => p.pid !== pid));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Process Management</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">PID</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">CPU %</th>
            <th className="p-2 text-left">Memory (MB)</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process) => (
            <tr key={process.pid} className="border-b">
              <td className="p-2">{process.pid}</td>
              <td className="p-2">{process.name}</td>
              <td className="p-2">{process.cpu.toFixed(1)}%</td>
              <td className="p-2">{process.memory.toFixed(1)} MB</td>
              <td className="p-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  onClick={() => handleKillProcess(process.pid)}
                >
                  Kill
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProcessManagement;