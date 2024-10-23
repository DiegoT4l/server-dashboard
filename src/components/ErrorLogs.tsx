import { useState, useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorLogs = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [filter, setFilter] = useState('');
  const errorsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchErrors = () => {
      // In a real application, this would be an API call to fetch error logs
      if (Math.random() > 0.7) {
        const newError = `[${new Date().toISOString()}] ERROR: ${generateRandomErrorMessage()}`;
        setErrors(prevErrors => [newError, ...prevErrors].slice(0, 100));
      }
    };

    fetchErrors();
    const interval = setInterval(fetchErrors, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (errorsEndRef.current) {
      errorsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [errors]);

  const generateRandomErrorMessage = () => {
    const messages = [
      'Connection refused',
      'Permission denied',
      'Out of memory',
      'Disk full',
      'Segmentation fault',
      'Unexpected EOF',
      'Invalid configuration',
      'Database connection failed',
      'SSL certificate expired',
      'Resource temporarily unavailable'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const filteredErrors = errors.filter(error => error.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <AlertTriangle className="mr-2 text-red-500" /> Error Logs
      </h2>
      <input
        type="text"
        placeholder="Filter errors..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="bg-gray-900 text-red-400 p-4 rounded-lg h-[calc(100vh-20rem)] overflow-y-auto font-mono text-sm">
        {filteredErrors.map((error, index) => (
          <div key={index} className="mb-1">
            {error}
          </div>
        ))}
        <div ref={errorsEndRef} />
      </div>
    </div>
  );
};

export default ErrorLogs;