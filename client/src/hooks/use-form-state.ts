/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useCallback, useState } from 'react';

export const useFormState = <T extends Record<string, any>>(defaultValue: T) => {
    const [formState, setFormState] = useState<T>(defaultValue);

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [event?.target.name]: event?.target.value });
    }, [formState]);

    return { formState, onChange };
};
