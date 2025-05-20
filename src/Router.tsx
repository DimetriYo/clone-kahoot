import { Route, Routes } from 'react-router'
import { Authorisation } from './pages/Authorisation'
import { MainWindow } from './pages/MainWindow'
import { AdminQuizReview } from './pages/AdminQuizReview'
import { Player } from './pages/Player'
import { useUserAuthorize } from './useUserAuthorize'
import { ActiveQuezWithGameId } from './pages/AdminActiveQuiz'
import { Winners } from './pages/Winners'
import { ActiveGameProvider } from './components/ui/ActiveGameProvider'

export function Router() {
  const { updateUserCredentials } = useUserAuthorize()

  return (
    <Routes>
      <Route path="/clone-kahoot">
        <Route
          index
          element={
            <Authorisation updateUserCredentials={updateUserCredentials} />
          }
        />
        <Route path="home" element={<MainWindow />} />

        <Route path=":gameId/admin" element={<AdminQuizReview />} />
        <Route
          path=":gameId/admin/activeGame"
          element={<ActiveQuezWithGameId />}
        />
        <Route
          path=":gameId/player"
          element={
            <ActiveGameProvider>
              <Player />
            </ActiveGameProvider>
          }
        />
        <Route
          path=":gameId/player/winners"
          element={
            <ActiveGameProvider>
              <Winners />
            </ActiveGameProvider>
          }
        />
      </Route>
    </Routes>
  )
}
