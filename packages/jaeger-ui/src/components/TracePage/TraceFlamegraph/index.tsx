import React from 'react';
import { FlamegraphRenderer } from '@pyroscope/flamegraph';
import '@pyroscope/flamegraph/dist/index.css';
import './index.css';

const TraceFlamegraph = ({ trace }: any) => {
  return (
    <div className="wrapper">
      <FlamegraphRenderer colorMode="light" trace={trace.data} />
    </div>
  );
};

export default TraceFlamegraph;
