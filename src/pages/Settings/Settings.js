import React, { createContext, useState } from 'react'
import Layout from '../../components/Layout'
import SettingsLayout from '../../components/Settings/SettingsLayout'

export const settingsContext = createContext();
const Settings = () => {
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
  return (
    <settingsContext.Provider value={{
        openShareProfileBox,
        shareProfileBoxOpen
    }}>
        <Layout>
            <SettingsLayout />
        </Layout>
    </settingsContext.Provider>
  )
}

export default Settings