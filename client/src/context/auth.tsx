/* eslint-disable no-alert */
/* eslint-disable no-empty-function */
import { FC, createContext, memo, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../api/client';
import { Loader } from '../components/ui/loader';
import { IAuthContext, ILoginResponse, IParentProps, IUser } from '../types';
import { LocalStorage, requestHandler } from '../utils';

const defaultContextValue: IAuthContext = {
    token: null,
    user: null,
    login: async () => { },
    register: async () => { },
    logout: async () => { }
};

const AuthContext = createContext<IAuthContext>(defaultContextValue);

const useAuthInfo = () => useContext(AuthContext);

const AuthProvider: FC<IParentProps> = memo(({ children }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        const _token = LocalStorage.getItem('token');
        const _user = LocalStorage.getItem('user');
        if (_token && _user) {
            setToken(_token.accessToken);
            setUser(_user);
        }
        setIsLoading(false);
    }, []);

    const login = useCallback(async (payload: Omit<IUser, 'email' | '_id'>) => {
        await requestHandler<ILoginResponse>({
            setIsLoading,
            request: async () => await loginUser(payload),
            onSuccess: (res) => {
                const { accessToken, user } = res.data;
                setUser(user);
                setToken(accessToken);
                LocalStorage.setItem('user', user);
                LocalStorage.setItem('token', { accessToken });
                navigate('/chat');
            },
            onError: alert
        }
        );
    }, [navigate]);

    const register = useCallback(async (payload: Omit<IUser, '_id'>) => {
        await requestHandler<Omit<IUser, 'email' | '_id'>>({
            setIsLoading,
            request: async () => await registerUser(payload),
            onSuccess: () => {
                alert('Account created successfully! Go ahead and login.');
                navigate('/login');
            },
            onError: alert
        }
        );
    }, [navigate]);

    const logout = useCallback(async () => { }, []);

    return <AuthContext.Provider value={{ token, user, login, register, logout }}>
        {isLoading ? <Loader /> : children}
    </AuthContext.Provider>;
});


// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuthInfo };

