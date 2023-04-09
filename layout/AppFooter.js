import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">    
            <a href="https://unchainedwolfs.com" target="_blank"><span className="font-medium ml-2">Unchained Wolfs</span></a>
        </div>
    );
};

export default AppFooter;
