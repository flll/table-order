import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.tableorder.app',
  appName: 'TableOrder',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    url: 'http://192.168.1.xxx:3000',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: 'android.keystore',
      keystoreAlias: 'androidalias',
      keystorePassword: process.env.KEYSTORE_PASSWORD,
    }
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#FFFFFF',
      showSpinner: true,
      spinnerColor: '#999999'
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#488AFF'
    }
  },
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    scheme: 'tableorder'
  },
  cordova: {
    preferences: {
      ScrollEnabled: 'false',
      'Keyboard-ScrollEnabled': 'false'
    }
  }
}

export default config 