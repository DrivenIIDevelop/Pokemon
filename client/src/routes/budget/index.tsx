import { useState, useReducer } from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'
import { getBudgets } from '@api/budgets'
import { BudgetMode, BudgetPageContext, BudgetsDispatchContext, budgetsReducer } from '@contexts/BudgetsContext'

import BudgetComponenet from '@components/budget/Budget'
import ExpenseDrawer from '@components/budget/ExpenseDrawer'

import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'

type LoadedData = Awaited<ReturnType<typeof getBudgets>>

export const loader: LoaderFunction = async (): Promise<LoadedData> => {
  return await getBudgets()
}

export function Component() {
  const [mode, setMode] = useState<BudgetMode>('budget')
  const initialBudgets = useLoaderData() as LoadedData
  const [budgets, dispatch] = useReducer(budgetsReducer, initialBudgets)

  const [openDrawer, setOpenDrawer] = useState<DrawerType>()

  return (
    <BudgetPageContext.Provider value={{ budgets, mode }}>
      <BudgetsDispatchContext.Provider value={dispatch}>
        <Container maxWidth="md">
          <Stack spacing={2}>
            <Box display="flex" justifyContent="center">
              <ToggleButtonGroup
                value={mode}
                onChange={(_, value: BudgetMode) => value && setMode(value)}
                exclusive
                size="small"
              >
                <ToggleButton value="budget">Budget</ToggleButton>
                <ToggleButton value="expenses">Expenses</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            {/* TODO - Budget Graph */}
            <Stack spacing={1.5}>
              {budgets.map(budget => (
                <BudgetComponenet budget={budget} key={budget._id} />
              ))}
            </Stack>
          </Stack>
          <Fab
            size="medium"
            color="primary"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            onClick={() => setOpenDrawer(mode == 'expenses' ? 'newUncategorizedExpense' : undefined)}
          >
            <AddIcon />
          </Fab>
          <ExpenseDrawer
            isOpen={openDrawer == 'newUncategorizedExpense'}
            close={() => setOpenDrawer(undefined)}
            categories={budgets.flatMap(budget => budget.categories)}
          />
        </Container>
      </BudgetsDispatchContext.Provider>
    </BudgetPageContext.Provider>
  )
}

type DrawerType = 'newUncategorizedExpense'
