import React, { useState, useMemo } from 'react';
import Context from './index.js';

const MainProvider = ({ children }) => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));

  const dataUser = useMemo(() => ({ data: userData, setUserData }), [userData]);

  return (
    <Context.Provider value={dataUser}>
      {children}
    </Context.Provider>
  );
};

export default MainProvider;
