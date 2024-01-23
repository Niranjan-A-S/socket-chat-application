import { FC, memo } from 'react';
import { useChatModel } from '../hooks/use-chat-model';

export const ChatContainer: FC = memo(() => {

    const { isChatModelOpen, toggleChatModel } = useChatModel();

    return <>
        <div >
            <div>
                <div>
                    <button
                        onClick={toggleChatModel}
                    >   + Add chat</button>
                </div>
            </div>
        </div>
    </>;
});
