
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zenithpos.app',
  appName: 'Zenith POS',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
