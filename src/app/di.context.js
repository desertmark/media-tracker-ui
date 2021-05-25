import React, { createContext, useContext, useState } from 'react';
import { container } from '../config/inversify';

const DIContext = createContext();

export function useInject(token) {
    const container = useContext(DIContext);
    return container.get(token);
}

export function DIProvider({ children }) {
    const [injector] = useState(container);
    return (
        <DIContext.Provider value={injector}>
            {children}
        </DIContext.Provider>
    );
}

export function withDependency(Component, tokens = []) {
    return function InjectionWrapper({ ...restProps }) {
        const container = useContext(DIContext);
        const dependencies = {};
        tokens.forEach(token => {
            dependencies[token] = container.get(token);
        });
        return (<Component {...dependencies} {...restProps}></Component>)
    }
}