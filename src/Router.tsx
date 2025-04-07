import { Route, Routes } from "react-router"
import { Authorisation } from "./pages/Authorisation"
import { AdminMainWindow } from "./pages/AdminMainWindow/AdminMainWindow"
import { AdminQuizReview } from "./pages/AdminQuizReview"
import { Player } from "./pages/Player"
import { useUserAuthorize } from "./useUserAuthorize"
import { ActiveQuezWithGameId } from "./pages/AdminActiveQuiz"

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
          <Route
            path="/activeGame/:gameId"
            element={<ActiveQuezWithGameId />}
          />
        </>
      ) : (
        <>
          <Route
            index
            element={
              <h1 className="text-2xl font-semibold">
                You need to follow the provided link, to join the game.
              </h1>
            }
          />
          <Route path="/:gameId" element={<Player />} />
        </>
      )}
    </Routes>
  )
}
