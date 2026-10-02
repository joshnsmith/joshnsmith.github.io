import { defineConfig } from 'vitest/config';

// Unit tests mock AI, so running tests never consumes Cloudflare's free allowance.
export default defineConfig({ test: { environment: 'node', include: ['test/**/*.spec.ts'] } });
