import React, { useDebugValue, useState } from 'react';

export function UseDebugValueWrap() {
    const status = UseFriendStatus('1');

    return <div>{status}</div>;
}

export function UseFriendStatus(id: string) {
    const [isOnline, setIsOnline] = useState(null);

    useDebugValue(isOnline ? 'Online' : 'Offline');

    return isOnline;
}
