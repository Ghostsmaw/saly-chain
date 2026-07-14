import http from 'k6/http';
import { check } from 'k6';

/**
 * Load smoke: core service health endpoints.
 * Run: k6 run -e GW=http://localhost:4000 load/k6/health-smoke.js
 */
export const options = {
  vus: 5,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.05'],
  },
};

const ports = (__ENV.PORTS || '4000,4006,4007').split(',').map((p) => p.trim());

export default function () {
  for (const port of ports) {
    const base = __ENV.GW ? __ENV.GW.replace(/:\d+$/, `:${port}`) : `http://localhost:${port}`;
    const res = http.get(`${base}/v1/health`);
    check(res, {
      [`health ${port} ok`]: (r) => r.status === 200,
    });
  }
}
