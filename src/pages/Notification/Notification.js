import Layout from '../../components/Layout'
import React, { createContext, useState } from 'react'
import NotificationLayout from '../../components/Notification/NotificationLayout'

export const NotificationContext = createContext(null);
const Notification = () => {
  return (
    <NotificationContext.Provider value={{
        
    }}>
      <Layout>
          <NotificationLayout />
      </Layout>
    </NotificationContext.Provider>
  )
}

export default Notification