import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

const ResourceMonitoring = () => {
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const checkResources = () => {
      const cpuUsage = Math.random() * 100;
      const memoryUsage = Math.random() * 100;
      const diskUsage = Math.random() * 100;

      if (cpuUsage > 90) {
        setAlerts(prev => [...prev, `High CPU usage: ${cpuUsage.toFixed(1)}%`]);
      }
      if (memoryUsage > 85) {
        setAlerts(prev => [...prev, `High memory usage: ${memoryUsage.toFixed(1)}%`]);
      }
      if (diskUsage > 95) {
        setAlerts(prev => [...prev, `High disk usage: ${diskUsage.toFixed(1)}%`]);
      }
    };

    const interval = setInterval(checkResources, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Resource Monitoring and Alerts</h2>
      {alerts.length === 0 ? (
        <div className="text-green-500">No active alerts</div>
      ) : (
        <div>
          {alerts.map((alert, index) => (
            <div key={index} className="flex items-center text-red-500 mb-2">
              <AlertTriangle className="mr-2" />
              {alert}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceMonitoring;