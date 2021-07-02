import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

class NotificationService {
  init = false;
  token = '';
  hasToken = false;
  hasPermission = false;
  constructor() {}
  initialize = () => {
    this.init = true;
    this.checkPermission();
    this.messageListener();
  };
  getToken = () => {
    return this.token;
  };
  tokenAssignment = async () => {
    let token = await this.getFcmToken();
    if (token) {
      this.token = token;
      this.hasToken = true;
      this.hasPermission = true;
    }
  };
  checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      this.tokenAssignment();
    } else {
      let askForPermission = await this.requestPermission();
      if (askForPermission) {
        this.tokenAssignment();
      }
    }
  };

  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('FCM Token --> ', fcmToken);
      return fcmToken;
    } else {
      return null;
    }
  };

  requestPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        this.hasPermission = true;
      }
      return true;
    } catch (error) {
      this.hasPermission = false;
      return false;
    }
  };

  messageListener = async () => {
    const messageListener = messaging().onMessage(message => {
      PushNotification.localNotification({
        smallIcon: 'ic_notification',
        message,
      });
    });
  };
}

export default new NotificationService();
