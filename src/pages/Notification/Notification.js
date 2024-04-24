import Layout from '../../components/Layout'
import React, { createContext, useEffect, useState } from 'react'
import NotificationLayout from '../../components/Notification/NotificationLayout'
import { axiosNotificationInstance } from '../../api/axoios';
import { token } from '../../api/token';
import autoLogout from '../../components/Hoc/AutoLogout/AutoLogout';

export const NotificationContext = createContext(null);
const Notification = () => {
  const [state, setState] = useState({
    loading: true,
    notificationData: null,
    notifications: [],
  })
  const {loading, notificationData, notifications} = state;

  const getNotifications = async (page) => {
    try {
      const {data} = await axiosNotificationInstance.get(`auth/get-notifications/${process.env.REACT_APP_DEFAULT_FETCH_COUNT}/${page}`, {
        headers: {
          token: token(),
        }
      })
      setState(state => ({
        ...state,
        loading: false,
        notificationData: data,
        notifications: [...state.notifications, ...data?.notifications],
      }))
    }catch(error) {
      console.log(error?.response?.data?.error)
    }
  }

  useEffect(() => {
    getNotifications(1)
  }, [])

  return (
    <NotificationContext.Provider value={{
        loading,
        notificationData, 
        notifications,
        getNotifications,
    }}>
      <Layout>
          <NotificationLayout />
      </Layout>
    </NotificationContext.Provider>
  )
}

export default autoLogout(Notification)