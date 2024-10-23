import { useState, useEffect } from 'react';
import { Cpu, MemoryStick, HardDrive, Network } from 'lucide-react';

const ServerStats = () => {
  const [stats, setStats] = useState({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
  });

  useEffect(() => {
    const fetchStats = () => {
      // In a real application, this would be an API call to fetch server stats
      setStats({
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        disk: Math.random() * 100,
        network: Math.random() * 1000,
      });
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Cpu className="mr-2" /> CPU Usage
        </h2>
        <div className="text-4xl font-bold">{stats.cpu.toFixed(1)}%</div>
        <div className="mt-2 bg-gray-200 h-4 rounded-full">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${stats.cpu}%` }}
          ></div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <MemoryStick className="mr-2" /> Memory Usage
        </h2>
        <div className="text-4xl font-bold">{stats.memory.toFixed(1)}%</div>
        <div className="mt-2 bg-gray-200 h-4 rounded-full">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${stats.memory}%` }}
          ></div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <HardDrive className="mr-2" /> Disk Usage
        </h2>
        <div className="text-4xl font-bold">{stats.disk.toFixed(1)}%</div>
        <div className="mt-2 bg-gray-200 h-4 rounded-full">
          <div
            className="bg-yellow-500 h-4 rounded-full"
            style={{ width: `${stats.disk}%` }}
          ></div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Network className="mr-2" /> Network Traffic
        </h2>
        <div className="text-4xl font-bold">{stats.network.toFixed(1)} Mbps</div>
        <div className="mt-2 bg-gray-200 h-4 rounded-full">
          <div
            className="bg-purple-500 h-4 rounded-full"
            style={{ width: `${(stats.network / 1000) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ServerStats;