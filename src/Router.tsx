import { Route, Routes } from "react-router"
import { Authorisation } from "./pages/Authorisation"
import { AdminMainWindow } from "./pages/AdminMainWindow/AdminMainWindow"
import { AdminQuizReview } from "./pages/AdminQuizReview"
import { Player } from "./pages/Player"
import { useUserAuthorize } from "./useUserAuthorize"

export function Router() {
  const { isAdmin, updateUserCredentials, userId } = useUserAuthorize()

  if (!userId) {
    return <Authorisation updateUserCredentials={updateUserCredentials} />
  }

  if (isAdmin === null) {
    return null
  }

  return (
    <Routes>
      {isAdmin ? (
        <>
          <Route index element={<AdminMainWindow />} />
          <Route path="/:gameId" element={<AdminQuizReview />} />
        </>
      ) : (
        <Route index element={<Player />} />
      )}
    </Routes>
  )
}
