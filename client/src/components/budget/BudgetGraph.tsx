import { useContext } from 'react'
import BudgetModeContext from '../../contexts/BudgetModeContext'

export default function BudgetGraph() {
  const mode = useContext(BudgetModeContext)
  return <h1>Budget Mode: {mode}</h1>
}
