import React, { createContext, useState, PropsWithChildren } from 'react';
import { TModalContext, TModalContextData } from '@/types';

export const ModalContext = createContext<TModalContext>({
    data: { opens: [], callbacks: {} },
    setData: () => {},
});

export const ModalProvider = ({ children }: PropsWithChildren) => {
    const [data, setData] = useState<TModalContextData>({
        opens: [],
        callbacks: {},
    });

    return <ModalContext.Provider value={{ data, setData }}>{children}</ModalContext.Provider>;
};
