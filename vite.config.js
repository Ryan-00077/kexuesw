import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const goRedirects = {
  '/go/shenxing': 'https://wuhan01.shenxingaff.com/#/?code=WUQMrgI8',
  '/go/dalaoyun': 'https://fugui0077.dalaoyunaff.com/#/?code=Wpfk4XD5',
  '/go/shandianshu': 'https://fugui0077.shandianshuaff.com/#/?code=KSByEAn9',
  '/go/liulianyun': 'https://zyrrz.liulianyunaff.com/#/?code=Y6A1M1MN',
  '/go/huanqiuti': 'https://fugui0077.huanqiutiaff.com/#/?code=rJyQn4xG',
  '/go/yunjiexian': 'https://fugui0077.yunjiexianaff.com/#/?code=FVkiFyAx'
};

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'dev-go-redirects',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const pathname = req.url ? req.url.split('?')[0] : '';
          const target = goRedirects[pathname];
          if (target) {
            res.writeHead(302, { Location: target });
            res.end();
            return;
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 3000,
    open: true
  }
});

