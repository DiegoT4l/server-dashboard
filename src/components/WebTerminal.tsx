import { useState, useEffect, useRef } from 'react';

const WebTerminal = () => {
  const [output, setOutput] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setHistory([...history, input]);
      setHistoryIndex(-1);
      setInput('');
    }
  };

  const executeCommand = (command: string) => {
    setOutput([...output, `$ ${command}`]);
    
    // Simulate command execution
    switch (command.toLowerCase()) {
      case 'ls':
        setOutput(prev => [...prev, 'file1.txt file2.txt directory1 directory2']);
        break;
      case 'pwd':
        setOutput(prev => [...prev, '/home/user']);
        break;
      case 'date':
        setOutput(prev => [...prev, new Date().toString()]);
        break;
      case 'whoami':
        setOutput(prev => [...prev, 'admin']);
        break;
      case 'uptime':
        setOutput(prev => [...prev, '14:23:52 up 3 days, 2:34, 1 user, load average: 0.08, 0.03, 0.01']);
        break;
      default:
        setOutput(prev => [...prev, `Command not found: ${command}`]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        setHistoryIndex(historyIndex + 1);
        setInput(history[history.length - 1 - historyIndex - 1]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
        setInput(history[history.length - 1 - historyIndex + 1]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="bg-gray-900 text-green-400 p-6 rounded-lg shadow-md h-[calc(100vh-12rem)] flex flex-col">
      <div ref={outputRef} className="flex-1 overflow-y-auto font-mono text-sm mb-4">
        {output.map((line, index) => (
          <div key={index} className="mb-1">
            {line}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <span className="mr-2">$</span>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono"
          placeholder="Enter command..."
        />
      </form>
    </div>
  );
};

export default WebTerminal;