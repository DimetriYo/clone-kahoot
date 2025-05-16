import { useContext } from 'react'
import { ActiveGameContext } from '@/constants'

export const useActiveGame = () => useContext(ActiveGameContext)
