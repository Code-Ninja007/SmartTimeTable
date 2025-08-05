
'use client';

import { useEffect, useState } from 'react';
import { useLocalStorage } from './use-local-storage';

function generateId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function useUserId() {
    const [userId, setUserId] = useLocalStorage<string | null>('classsync-user-id', null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (!userId) {
            setUserId(generateId());
        }
    }, [userId, setUserId]);

    return isMounted ? userId : null;
}
