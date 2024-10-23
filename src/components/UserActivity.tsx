import { useState, useEffect } from 'react';

interface UserActivity {
  username: string;
  lastLogin: string;
  activeSession: boolean;
}

const UserActivity = () => {
  const [users, setUsers] = useState<UserActivity[]>([]);

  useEffect(() => {
    const fetchUserActivity = () => {
      // In a real application, this would be an API call to fetch user activity
      const newUsers: UserActivity[] = [
        { username: 'admin', lastLogin: new Date().toISOString(), activeSession: true },
        { username: 'user1', lastLogin: new Date(Date.now() - 86400000).toISOString(), activeSession: false },
        { username: 'user2', lastLogin: new Date(Date.now() - 3600000).toISOString(), activeSession: true },
      ];
      setUsers(newUsers);
    };

    fetchUserActivity();
    const interval = setInterval(fetchUserActivity, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">User Activity</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Username</th>
            <th className="p-2 text-left">Last Login</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username} className="border-b">
              <td className="p-2">{user.username}</td>
              <td className="p-2">{new Date(user.lastLogin).toLocaleString()}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded-full text-xs ${user.activeSession ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
                  {user.activeSession ? 'Active' : 'Inactive'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserActivity;