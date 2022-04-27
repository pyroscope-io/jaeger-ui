import React, { useEffect, useState } from 'react';
import { FlamegraphRenderer } from '@pyroscope/flamegraph';
import queryString from 'query-string';
import '@pyroscope/flamegraph/dist/index.css';

interface IProps {
  url: string;
  type: 'diff' | 'single';
}

const composeUrl = ({ url, type }: IProps) => {
  const origin = new URL(url).origin;
  const parsed = queryString.parseUrl(url);
  const commonParams = {
    'max-nodes': 1024,
    format: 'json',
  };

  switch (type) {
    case 'single':
      return `${origin}/render?${queryString.stringify({
        from: 'now-1h',
        until: 'now',
        query: parsed.query.query,
        ...commonParams,
      })}`;

    case 'diff':
      return `${origin}/render-diff?${queryString.stringify({
        from: parsed.query.from,
        until: parsed.query.until,
        rightQuery: parsed.query.rightQuery,
        leftQuery: parsed.query.leftQuery,
        query: parsed.query.query,
        leftFrom: parsed.query.leftFrom,
        leftUntil: parsed.query.leftUntil,
        rightFrom: parsed.query.rightFrom,
        rightUntil: parsed.query.rightUntil,
        ...commonParams,
      })}`;
  }
};

const FlameGraph = ({ url, type }: IProps) => {
  const [profile, setProfile] = useState();

  useEffect(() => {
    const fetchFlameGraphData = async () => {
      try {
        const dataUrl = composeUrl({ url, type });
        const response = await fetch(dataUrl);
        const data = await response.json();

        setProfile(data);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchFlameGraphData();
  }, []);

  return (
    <div
      style={{
        width: '100%',
        overflowY: 'auto',
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      <FlamegraphRenderer profile={profile as any} onlyDisplay="flamegraph" showToolbar={false} />
    </div>
  );
};

export default FlameGraph;
