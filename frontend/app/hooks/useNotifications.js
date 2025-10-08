import * as Notifications from "expo-notifications";

export default function useNotifications() {
  async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") return;
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  }

  return { registerForPushNotificationsAsync };
}
