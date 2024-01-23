import { useCallback, useState } from 'react';

export const useChatModel = () => {
    const [isChatModelOpen, setIsChatModelOpen] = useState<boolean>(false);

    const toggleChatModel = useCallback(() => {
        setIsChatModelOpen(!isChatModelOpen);
    }, [isChatModelOpen]);

    return { isChatModelOpen, toggleChatModel };
};
