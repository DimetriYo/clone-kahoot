import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import { Authorisation } from './pages/Authorisation'
import { AdminMainWindow } from './pages/AdminMainWindow/AdminMainWindow'
import { AdminQuizPage } from './pages/AdminQuizPage'
import { Player } from './pages/Player'
import { ADMIN_ID } from './constants'

const LS_USER_ID_KEY = 'userId'

export function Router() {
  const [userId, setUserId] = useState<string>()

  useEffect(() => {
    const lsUserId = localStorage.getItem(LS_USER_ID_KEY)

    if (userId) {
      if (!lsUserId) {
        localStorage.setItem(LS_USER_ID_KEY, userId)
      }
    } else if (lsUserId) {
      setUserId(lsUserId)
    }
  }, [userId])

  if (!userId) {
    return <Authorisation setUserId={setUserId} />
  }

  const isAdminUser = userId === ADMIN_ID

  return (
    <Routes>
      {isAdminUser ? (
        <>
          <Route index element={<AdminMainWindow />} />
          <Route path="/:gameId" element={<AdminQuizPage />} />
        </>
      ) : (
        <Route index element={<Player />} />
      )}
    </Routes>
  )
}
