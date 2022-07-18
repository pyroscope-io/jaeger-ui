import React from 'react';
import { FlamegraphRenderer, convertJaegerTraceToProfile } from '@pyroscope/flamegraph';
import '@pyroscope/flamegraph/dist/index.css';
import './index.css';

const TraceFlamegraph = ({ trace }: any) => {
  let convertedProfile = convertJaegerTraceToProfile(trace.data);

  return (
    <div className="wrapper">
      <FlamegraphRenderer colorMode="light" profile={convertedProfile} />
    </div>
  );
};

export default TraceFlamegraph;
