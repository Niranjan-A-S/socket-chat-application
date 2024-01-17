/* eslint-disable no-empty-function */
import { FC, ReactNode, createContext, memo, useCallback, useContext, useEffect, useState } from 'react';
import { IAuthContext, IUser } from '../types';
import { Loader } from '../components/ui/loader';
import { LocalStorage } from '../utils';

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

    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        const _token = LocalStorage.getItem('token');
        const _user = LocalStorage.getItem('user');
        if (_token && _user) {
            setToken(_token);
            setUser(_user);
        }
        setIsLoading(false);
    }, []);

    const login = useCallback(async (payload: Omit<IUser, 'email'>) => { }, []);
    const register = useCallback(async (payload: IUser) => { }, []);
    const logout = useCallback(async () => { }, []);

    return <AuthContext.Provider value={{ token, user, login, register, logout }}>
        {isLoading ? <Loader /> : children}
    </AuthContext.Provider>;
});


// eslint-disable-next-line react-refresh/only-export-components
export { useAuthInfo, AuthProvider };
