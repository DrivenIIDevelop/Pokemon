import { useState } from 'react'
import Box from '@mui/material/Box'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import BudgetModeContext, { BudgetMode } from '../../contexts/BudgetModeContext'
import BudgetGraph from '../../components/budget/BudgetGraph'
import BudgetCategory from '../../components/budget/BudgetCategory'

export function Component() {
  const [mode, setMode] = useState<BudgetMode>('budget')

  return (
    <BudgetModeContext.Provider value={mode}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100dvw',
        }}
      >
        <ToggleButtonGroup
          value={mode}
          onChange={(_, value) => setMode(value)}
          exclusive
          size="small"
          sx={{ backgroundColor: 'primary.main' }}
        >
          <ToggleButton value="budget">Budget</ToggleButton>
          <ToggleButton value="expenses">Expenses</ToggleButton>
        </ToggleButtonGroup>
        <BudgetGraph />
        <BudgetCategory category={{}} />
      </Box>
    </BudgetModeContext.Provider>
  )
}
