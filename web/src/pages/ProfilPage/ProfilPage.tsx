import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { Tabs } from '@mantine/core';
import { CurrencyBitcoin, Settings, } from 'tabler-icons-react';
import CryptoSettingsCell from 'src/components/CryptoSettingsCell'
import GlobalSettingsCell from 'src/components/GlobalSettingsCell'
import { useAuth } from '@redwoodjs/auth'

const ProfilPage = () => {
  const { currentUser } = useAuth()

  return (
    <>
      <MetaTags title="Profil" description="Profil page" />

      <Tabs grow tabPadding="xl">
        <Tabs.Tab label="Global settings" icon={<Settings size={18} />} style={{ fontWeight: 500 }} ><GlobalSettingsCell id={currentUser.id}/></Tabs.Tab>
        <Tabs.Tab label="Crypto settings" icon={<CurrencyBitcoin size={18} />} style={{ fontWeight: 500 }} ><CryptoSettingsCell id={currentUser.id}/></Tabs.Tab>
      </Tabs>
    </>
  )
}

export default ProfilPage
