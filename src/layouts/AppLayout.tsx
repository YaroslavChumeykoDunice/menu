import { useState } from 'react';

import Header from '../components/Header/Header';
import MainContainer from '../components/MainContainer/MainContainer';
import Sidebar from '../components/Sidebar/Sidebar';

import styles from './AppLayout.module.css';

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  return (
    <div className={styles.app}>
      <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

      <main className={styles.content}>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <MainContainer />
      </main>
    </div>
  );
};

export default AppLayout;