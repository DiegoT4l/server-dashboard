import { useState } from 'react';
import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react';

interface FileSystemItem {
  name: string;
  type: 'file' | 'directory';
  children?: FileSystemItem[];
}

const initialFileSystem: FileSystemItem[] = [
  {
    name: 'home',
    type: 'directory',
    children: [
      {
        name: 'user',
        type: 'directory',
        children: [
          { name: 'documents', type: 'directory', children: [
            { name: 'report.pdf', type: 'file' },
            { name: 'data.xlsx', type: 'file' },
          ]},
          { name: 'pictures', type: 'directory', children: [
            { name: 'vacation.jpg', type: 'file' },
            { name: 'family.png', type: 'file' },
          ]},
          { name: 'notes.txt', type: 'file' },
        ],
      },
    ],
  },
  {
    name: 'var',
    type: 'directory',
    children: [
      { name: 'log', type: 'directory', children: [
        { name: 'system.log', type: 'file' },
        { name: 'auth.log', type: 'file' },
      ]},
    ],
  },
  { name: 'etc', type: 'directory', children: [] },
  { name: 'usr', type: 'directory', children: [] },
];

const FileExplorer: React.FC = () => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const renderFileSystem = (items: FileSystemItem[], currentPath: string = '') => {
    return items.map(item => {
      const fullPath = `${currentPath}/${item.name}`;
      const isExpanded = expandedFolders.has(fullPath);

      if (item.type === 'directory') {
        return (
          <div key={fullPath}>
            <div
              className="flex items-center cursor-pointer hover:bg-gray-100 p-1"
              onClick={() => toggleFolder(fullPath)}
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <Folder size={16} className="mr-2 text-yellow-500" />
              {item.name}
            </div>
            {isExpanded && item.children && (
              <div className="ml-4">
                {renderFileSystem(item.children, fullPath)}
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div key={fullPath} className="flex items-center p-1 ml-6">
            <File size={16} className="mr-2 text-gray-500" />
            {item.name}
          </div>
        );
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">File Explorer</h2>
      <div className="border rounded p-4">
        {renderFileSystem(initialFileSystem)}
      </div>
    </div>
  );
};

export default FileExplorer;