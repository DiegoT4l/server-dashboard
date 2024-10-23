import { useState, useEffect } from 'react';
import { Archive, CheckCircle, XCircle } from 'lucide-react';

interface Backup {
  id: number;
  timestamp: string;
  status: 'success' | 'failed';
  size: string;
}

const BackupManagement = () => {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [isBackingUp, setIsBackingUp] = useState(false);

  useEffect(() => {
    const fetchBackups = () => {
      // In a real application, this would be an API call to fetch backup history
      const newBackups: Backup[] = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() - i * 86400000,
        timestamp: new Date(Date.now() - i * 86400000).toISOString(),
        status: Math.random() > 0.2 ? 'success' : 'failed',
        size: `${(Math.random() * 10 + 1).toFixed(2)} GB`,
      }));
      setBackups(newBackups);
    };

    fetchBackups();
  }, []);

  const handleBackup = () => {
    setIsBackingUp(true);
    // Simulate backup process
    setTimeout(() => {
      const newBackup: Backup = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        status: 'success',
        size: `${(Math.random() * 10 + 1).toFixed(2)} GB`,
      };
      setBackups([newBackup, ...backups]);
      setIsBackingUp(false);
    }, 3000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Backup Management</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 flex items-center"
        onClick={handleBackup}
        disabled={isBackingUp}
      >
        <Archive className="mr-2" size={16} />
        {isBackingUp ? 'Backing up...' : 'Start Backup'}
      </button>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Timestamp</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Size</th>
          </tr>
        </thead>
        <tbody>
          {backups.map((backup) => (
            <tr key={backup.id} className="border-b">
              <td className="p-2">{new Date(backup.timestamp).toLocaleString()}</td>
              <td className="p-2">
                {backup.status === 'success' ? (
                  <span className="flex items-center text-green-500">
                    <CheckCircle className="mr-1" size={16} /> Success
                  </span>
                ) : (
                  <span className="flex items-center text-red-500">
                    <XCircle className="mr-1" size={16} /> Failed
                  </span>
                )}
              </td>
              <td className="p-2">{backup.size}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BackupManagement;