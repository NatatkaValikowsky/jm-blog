import React from 'react';

import Header from '../header/header';
import './app.css';

const App: React.FC = ({ children }) => (
    <div className="main-outer">
        <Header />
        <div className="wrapper">
            {children}
        </div>
    </div>
);

export default App;