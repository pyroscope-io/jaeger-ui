import React, { useEffect, useState } from 'react';
// import FlamegraphRenderer from './FlameGraphRenderer';
import { pyroscopeCPU } from './testData';
import { FlamegraphRenderer } from "@pyroscope/flamegraph";
import "@pyroscope/flamegraph/dist/index.css";

const FlameGraph = ({ url }: { url: string }) => {
  const [profile, setProfile] = useState();
  useEffect(() => {
    const fetchFlameGraphData = async () => {
      const query = url.split(/.*?query=(.*?)/);
      const endpoint = url.match(/(.*)\?query/);

      try {
        const response = await fetch(
          `${endpoint ? endpoint[1] : ''}/render?from=now-1h&until=now&query=${
            query[2]
          }&max-nodes=1024}&format=json`
        );
        const data = await response.json();

        setProfile(data);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchFlameGraphData();
  }, []);

  return (
    <div style={{ width: '100%', height: 300, overflowY: 'auto' }}>
      <FlamegraphRenderer
        profile={(profile || pyroscopeCPU) as any}
        onlyDisplay="flamegraph"
        showToolbar={false}
      />
    </div>
  );
};

export default FlameGraph;
