import { useState } from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import BudgetModeContext, { BudgetMode } from '../../contexts/BudgetModeContext'
import BudgetGraph from '../../components/budget/BudgetGraph'
import BudgetComponenet from '../../components/budget/Budget'
import budgets from '../../../demo-data/budgets.json'

interface LoadedData {
  budgets: Budget[]
}

export const loader: LoaderFunction = (): LoadedData => {
  // TODO: Get data from API
  return { budgets } as LoadedData
}

export function Component() {
  const { budgets } = useLoaderData() as LoadedData
  const [mode, setMode] = useState<BudgetMode>('budget')

  return (
    <BudgetModeContext.Provider value={mode}>
      <Container maxWidth="md">
        <Stack spacing={2}>
          <Box display="flex" justifyContent="center">
            <ToggleButtonGroup value={mode} onChange={(_, value: BudgetMode) => setMode(value)} exclusive size="small">
              <ToggleButton value="budget">Budget</ToggleButton>
              <ToggleButton value="expenses">Expenses</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <BudgetGraph />
          <Stack spacing={1.5}>
            {budgets.map(budget => (
              <BudgetComponenet budget={budget} key={budget.id} />
            ))}
          </Stack>
        </Stack>
      </Container>
    </BudgetModeContext.Provider>
  )
}
