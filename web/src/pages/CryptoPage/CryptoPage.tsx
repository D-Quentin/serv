import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { Button } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { createCookie, readCookie } from 'src/scripts/Cookie'

const Test = async () => {
  const option = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: readCookie('userId'),
    })
  };
  const res = await (await fetch(process.env.FONCTION_URL + "crypto", option)).json();
  if (res.success) {
    console.log(res.data);
  } else {
    showNotification({ title: 'Fail to create a new bot', message: res.message, color: 'red', })
  }
}

const CryptoPage = () => {
  const { currentUser } = useAuth()
  createCookie("userId", currentUser.id, 1)
  return (
    <>
      <MetaTags title="Crypto" description="Crypto page" />

      <Button onClick={Test}>Test</Button>
    </>
  )
}

export default CryptoPage
