import { Link, routes } from '@redwoodjs/router'
import { useRef, useState } from 'react'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { Button, Tabs, Select, Center, Box, Stack, Group, NumberInput, Text } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { createCookie, readCookie } from 'src/scripts/Cookie'
import { BrandTabler, Plus, } from 'tabler-icons-react'
import CryptoCreateBotCell from 'src/components/CryptoCreateBotCell'
import { LoginSingUpWrapper } from './../style/Global.style'

const Test = async () => {
  const option = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: readCookie('userId'),
      api: "BinanceFuturesTest",
      symbol: "BTCUSDT",
      quantity: "0.001",
    })
  };
  const res = await (await fetch(process.env.FONCTION_URL + "crypto", option)).json()
  if (res.success) {
    console.log(res.data);
  } else {
    showNotification({ title: 'Fail to create a new bot', message: res.message, color: 'red', })
  }
}

const CryptoPage = () => {
  const { currentUser } = useAuth()
  const apiType = useRef(null)
  const currency = useRef(null)
  const quantity = useRef(null)
  const [apiTypeData, setApiTypeData] = useState(null)
  const [currencyData, setCurrencyData] = useState(null)
  const [usdtValue, setUsdtValue] = useState("0")
  const [cryptoValue, setCryptoValue] = useState(0)

  const apiTypeClick = async () => {
    const option = {method: "GET"};
    const apiData = await (await fetch(process.env.FONCTION_URL + "getApiData", option)).json()
    setApiTypeData(apiData.apiList)
  }
  const apiTypeChange = async () => {
    const option = {method: "GET"};
    const apiData = await (await fetch(process.env.FONCTION_URL + "getApiData", option)).json()
    for (let i = 0; i < apiData.api.length; i++) {
      if (apiData.api[i].name === apiType.current.value) {
        setCurrencyData(apiData.api[i].currency)
        break
      }
    }
  }
  const currencyChange = async (currency: string) => {
    const option = {
      method: "POST", headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: readCookie('userId'),
        api: apiType.current.value,
        symbol: currency,
      })
    };
    const res = await (await fetch(process.env.FONCTION_URL + "getPriceCrypto", option)).json()
    setCryptoValue(res.data)
  }
  const quantityInputChange = (value: number) => {
    setUsdtValue((cryptoValue * value).toFixed(2))
  }
  createCookie("userId", currentUser.id, 1)
  return (
    <>
      <MetaTags title="Crypto" description="Crypto page" />

      <Tabs grow tabPadding="xl">
        <Tabs.Tab label="Overview" icon={<BrandTabler size={18} />} style={{ fontWeight: 500 }} ></Tabs.Tab>
        <Tabs.Tab label="Create a bot" icon={<Plus size={18} />} style={{ fontWeight: 500 }} >
          <Center style={{ width: '100%', height: 400 }}>
            <Box sx={(theme) => LoginSingUpWrapper(theme)}>
              <Stack spacing="lg">
                <Select ref={apiType} onDropdownOpen={apiTypeClick} onChange={apiTypeChange} data={apiTypeData || [""]} placeholder='Select one' label='API Type'/>
                <Group>
                  <Select ref={currency} data={currencyData || [""]} onChange={(e) => currencyChange(e)} placeholder='Select one' label='Currency' style={{width: 160}}/>
                  <NumberInput ref={quantity} onChange={(e) => quantityInputChange(e)} defaultValue={0} precision={3} min={0.001} hideControls label='Quantity' style={{width: 160}} />
                </Group>
                <Text weight={500} style={{paddingLeft: "10px"}}>{usdtValue + " USDT"}</Text>
                <Button variant="gradient" gradient={{ from: 'orange', to: 'red' }}>Create Bot</Button>
              </Stack>
            </Box>
          </Center>
        </Tabs.Tab>
      </Tabs>
    </>
  )
}

export default CryptoPage
