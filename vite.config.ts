import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    rollupOptions: {
      output: {
        // Bibliotecas em arquivos próprios: mudam pouco, então ficam em cache no navegador
        // entre uma versão e outra do sistema. O gráfico (recharts) só baixa com o painel.
        manualChunks(id) {
          if (/\/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react';
          if (/\/node_modules\/(recharts|recharts-scale|react-smooth|victory-vendor|d3-[^/]+|lodash)\//.test(id)) return 'charts';
          if (id.includes('/node_modules/lucide-react/')) return 'icons';
          return undefined;
        }
      }
    }
  }
});
