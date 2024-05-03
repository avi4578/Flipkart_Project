import React, { useState, useEffect, useCallback } from 'react';
import '../NetworkStatus.css'; // Import CSS file for styling
import offlineimage from '../../src/offline.jpg';


const NetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const onlineListener = useCallback(() => setIsOnline(true), [setIsOnline]);
    const offlineListener = useCallback(() => setIsOnline(false), [setIsOnline]);

    useEffect(() => {
        // window.addEventListener('online', handleOnline);
        // window.addEventListener('offline', handleOffline);
        window.addEventListener('online', onlineListener);
        window.addEventListener('offline', offlineListener);
    
        return () => {
          window.removeEventListener('online', onlineListener);
          window.removeEventListener('offline', offlineListener);
        };

        // return () => {
        //     window.removeEventListener('online', handleOnline);
        //     window.removeEventListener('offline', handleOffline);
        // };
    }, [onlineListener, offlineListener]);

    return (
        <div className="pageheader">
            {isOnline ? (
                <>
                <div className="online-animation">
                    <div className="image-container">
                        <h1>Network Status</h1>
                        <img src="image/online.jpg" alt="Online" height="450px" />
                        <p>Application is online</p>
                        <p>Your device is currently connected to the internet.</p>
                    </div>
                </div>

                <img
        style={isOnline ? { display: 'none' } : undefined}
        src="image/offline.jpg"
        alt="no internet"
      />

                </>
            ) : (
                <div className="offline-animation">
                    <div className="image-container">
                        <h1>Network Status</h1>
                        <img src="image/offline.jpg" alt="Offline" height="450px" />
                        <p>Application is offline</p>
                        <p>Your device is currently not connected to the internet.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NetworkStatus;
