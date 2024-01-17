import { IRequestHandlerParams } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const resolveClassNames = (...classNames: string[]) => classNames.filter(Boolean).join(' ');

export const isBrowser = typeof window !== 'undefined';

export class LocalStorage {
    static getItem(key: string) {
        if (!isBrowser) return;
        const value = localStorage.getItem(key);
        if (value) {
            try {
                return JSON.parse(value);
            } catch (error) {
                return null;
            }
        }
        return null;
    }

    static setItem(key: string, value: any) {
        if (!isBrowser) return;
        localStorage.setItem(key, value);
    }

    static remove(key: string) {
        if (!isBrowser) return;
        localStorage.removeItem(key);
    }

    static clear() {
        if (!isBrowser) return;
        localStorage.clear();
    }
}

export const requestHandler = async <T>({
    setIsLoading,
    request,
    onSuccess,
    onError
}: IRequestHandlerParams<T>) => {
    if (setIsLoading) setIsLoading(true);

    try {
        const { data } = await request();
        if (data?.success) {
            onSuccess(data);
        }
    } catch (error: any) {
        if ([401, 403].includes(error?.response.data?.statusCode)) {
            localStorage.clear();
            if (isBrowser) window.location.href = '/login';
        }
        onError(error?.response?.data?.message || 'Something went wrong');
    } finally {
        if (setIsLoading) setIsLoading(false);
    }
};
