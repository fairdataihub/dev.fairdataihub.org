
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['@braintree/sanitize-url', 'mermaid', 'dayjs', 'moment-mini'],
  },
  plugins: [
    
  ],
  resolve: {
    alias: {
      dayjs: 'dayjs/',
    },
  },
});
