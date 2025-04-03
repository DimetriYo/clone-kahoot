import { Player } from "@/types/Player"
import { useEffect, useState } from "react"

export const useActiveGame = (gameId: string | undefined) => {
  const [players, setPlayers] = useState<(Player & { bgColor: string })[]>([])

  useEffect(() => {
    const socket = new WebSocket(`${import.meta.env.VITE_DEV_API_WS}/${gameId}`)

    socket.onopen = () => {
      console.log("Connection at frontend established!")
    }
  }, [])

  return { players }
}
