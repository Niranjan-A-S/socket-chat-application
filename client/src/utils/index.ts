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
