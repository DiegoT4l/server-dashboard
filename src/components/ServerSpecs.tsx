import { Cpu, MemoryStick, HardDrive, Network } from 'lucide-react';

const ServerSpecs = () => {
  const specs = {
    cpu: 'Intel Xeon E5-2680 v4 @ 2.40GHz',
    cores: 14,
    threads: 28,
    ram: '64 GB DDR4',
    storage: '2 x 1TB NVMe SSD',
    network: '10 Gbps',
    os: 'Ubuntu 20.04 LTS',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Server Specifications</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Cpu className="mr-2" />
          <div>
            <div className="font-semibold">CPU</div>
            <div>{specs.cpu}</div>
          </div>
        </div>
        <div className="flex items-center">
          <Cpu className="mr-2" />
          <div>
            <div className="font-semibold">Cores / Threads</div>
            <div>{specs.cores} / {specs.threads}</div>
          </div>
        </div>
        <div className="flex items-center">
          <MemoryStick className="mr-2" />
          <div>
            <div className="font-semibold">RAM</div>
            <div>{specs.ram}</div>
          </div>
        </div>
        <div className="flex items-center">
          <HardDrive className="mr-2" />
          <div>
            <div className="font-semibold">Storage</div>
            <div>{specs.storage}</div>
          </div>
        </div>
        <div className="flex items-center">
          <Network className="mr-2" />
          <div>
            <div className="font-semibold">Network</div>
            <div>{specs.network}</div>
          </div>
        </div>
        <div className="flex items-center">
          <Cpu className="mr-2" />
          <div>
            <div className="font-semibold">Operating System</div>
            <div>{specs.os}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerSpecs;