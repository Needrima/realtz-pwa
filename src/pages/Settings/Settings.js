import React, { createContext, useState } from 'react'
import Layout from '../../components/Layout'
import SettingsLayout from '../../components/Settings/SettingsLayout'
import { useDispatch } from 'react-redux';
import {logout} from '../../redux/Actions'

export const settingsContext = createContext();
const Settings = () => {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        shareProfileBoxOpen: false,
    })
    const {shareProfileBoxOpen} = state

    const openShareProfileBox = (show) => {
        setState(state => ({
            ...state,
            shareProfileBoxOpen: show,
        }))
    }

    const logoutUser = () => {
        dispatch(logout())
        window.location.href = '/login'
    }

  return (
    <settingsContext.Provider value={{
        openShareProfileBox,
        shareProfileBoxOpen,
        logoutUser,
    }}>
        <Layout>
            <SettingsLayout />
        </Layout>
    </settingsContext.Provider>
  )
}

export default Settings