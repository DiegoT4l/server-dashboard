import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface SecurityEvent {
  id: number;
  timestamp: string;
  type: 'warning' | 'critical' | 'info';
  message: string;
}

const SecurityEvents = () => {
  const [events, setEvents] = useState<SecurityEvent[]>([]);

  useEffect(() => {
    const fetchSecurityEvents = () => {
      // In a real application, this would be an API call to fetch security events
      const newEvent: SecurityEvent = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        type: ['warning', 'critical', 'info'][Math.floor(Math.random() * 3)] as 'warning' | 'critical' | 'info',
        message: `Security event ${Math.random().toString(36).substring(7)}`,
      };
      setEvents(prev => [newEvent, ...prev].slice(0, 10));
    };

    fetchSecurityEvents();
    const interval = setInterval(fetchSecurityEvents, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Security Events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className={`p-4 rounded-lg flex items-start ${
            event.type === 'critical' ? 'bg-red-100' :
            event.type === 'warning' ? 'bg-yellow-100' :
            'bg-blue-100'
          }`}>
            {event.type === 'critical' || event.type === 'warning' ? (
              <AlertTriangle className="mr-2 flex-shrink-0" />
            ) : (
              <CheckCircle className="mr-2 flex-shrink-0" />
            )}
            <div>
              <div className="font-semibold">{event.type.toUpperCase()}</div>
              <div>{event.message}</div>
              <div className="text-sm text-gray-500">{new Date(event.timestamp).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityEvents;