import { Route, Routes } from 'react-router'
import { Authorisation } from './pages/Authorisation'
import { MainWindow } from './pages/MainWindow'
import { AdminQuizReview } from './pages/AdminQuizReview'
import { Player } from './pages/Player'
import { useUserAuthorize } from './useUserAuthorize'
import { ActiveQuezWithGameId } from './pages/AdminActiveQuiz'
import { Winners } from './pages/Winners'

export function Router() {
  const { updateUserCredentials, userId } = useUserAuthorize()

  return (
    <Routes>
      <Route
        index
        element={
          <Authorisation updateUserCredentials={updateUserCredentials} />
        }
      />
      <Route path="/home" element={<MainWindow userId={userId} />} />

      <Route path="/:gameId/admin" element={<AdminQuizReview />} />
      <Route
        path="/:gameId/admin/activeGame"
        element={<ActiveQuezWithGameId />}
      />
      <Route path="/:gameId/player" element={<Player />} />
      <Route path="/:gameId/winners" element={<Winners />} />
    </Routes>
  )
}
