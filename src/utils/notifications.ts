export const requestNotificationDesktop = async () => {
    const permission = Notification.permission;
    if (permission === 'denied') return;
    if (permission === 'granted') return;
    await Notification.requestPermission();
};

export const notificationDesktop = async (data: any) => {
    const permission = Notification.permission;
    if (permission === 'denied') return;
    showNotification(data);
};

const showNotification = async ({ title, body, icon, tag }: any) => {
    new Notification(title, { body, icon, silent: false, tag });
};
