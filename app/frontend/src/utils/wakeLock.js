let wakeLock = null;

export const requestWakeLock = async () => {
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen');
      console.log('Wake Lock activated');
      
      wakeLock.addEventListener('release', () => {
        console.log('Wake Lock released');
      });
      
      return true;
    } else {
      console.log('Wake Lock API not supported');
      return false;
    }
  } catch (err) {
    console.error(`Wake Lock error: ${err.message}`);
    return false;
  }
};

export const releaseWakeLock = async () => {
  if (wakeLock !== null) {
    try {
      await wakeLock.release();
      wakeLock = null;
      console.log('Wake Lock released manually');
    } catch (err) {
      console.error(`Wake Lock release error: ${err.message}`);
    }
  }
};

export const reacquireWakeLock = async () => {
  if (document.visibilityState === 'visible') {
    await requestWakeLock();
  }
};
