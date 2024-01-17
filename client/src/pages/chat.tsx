import { FC, memo } from 'react';
import { PrivateRoute } from '../components/route/private-route';
import { ChatContainer } from '../containers/chat';

export const ChatPage: FC = memo(() => (
    <PrivateRoute>
        <ChatContainer />
    </PrivateRoute>
));
