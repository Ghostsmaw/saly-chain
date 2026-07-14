import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * Load test: gateway intent submit hot path.
 * Run: k6 run -e GW=https://gateway -e KEY=sk_test_... -e BODY='{...}' load/k6/intent-submit.js
 */
export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<300'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.post(`${__ENV.GW}/v1/intents`, __ENV.BODY, {
    headers: {
      Authorization: `Bearer ${__ENV.KEY}`,
      'Idempotency-Key': `k6-${__VU}-${__ITER}-${Date.now()}`,
      'Content-Type': 'application/json',
    },
  });
  check(res, {
    'status 2xx': (r) => r.status >= 200 && r.status < 300,
  });
  sleep(0.1);
}
