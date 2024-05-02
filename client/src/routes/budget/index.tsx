import { useState, useReducer } from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'
import { getBudgets } from '../../api/budgets'

import { BudgetMode, BudgetPageContext, BudgetsDispatchContext, budgetsReducer } from '../../contexts/BudgetsContext'
import BudgetGraph from '../../components/budget/BudgetGraph'
import BudgetComponenet from '../../components/budget/Budget'

import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'

type LoadedData = Awaited<ReturnType<typeof getBudgets>>

export const loader: LoaderFunction = async (): Promise<LoadedData> => {
  return await getBudgets()
}

export function Component() {
  const [mode, setMode] = useState<BudgetMode>('budget')
  const initialBudgets = useLoaderData() as LoadedData
  const [budgets, dispatch] = useReducer(budgetsReducer, initialBudgets)

  return (
    <BudgetPageContext.Provider value={{ budgets, mode }}>
      <BudgetsDispatchContext.Provider value={dispatch}>
        <Container maxWidth="md">
          <Stack spacing={2}>
            <Box display="flex" justifyContent="center">
              <ToggleButtonGroup
                value={mode}
                onChange={(_, value: BudgetMode) => setMode(value)}
                exclusive
                size="small"
              >
                <ToggleButton value="budget">Budget</ToggleButton>
                <ToggleButton value="expenses">Expenses</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <BudgetGraph />
            <Stack spacing={1.5}>
              {budgets.map(budget => (
                <BudgetComponenet budget={budget} key={budget._id} />
              ))}
            </Stack>
          </Stack>
        </Container>
      </BudgetsDispatchContext.Provider>
    </BudgetPageContext.Provider>
  )
}
