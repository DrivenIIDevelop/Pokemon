import { useState } from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import BudgetModeContext, { BudgetMode } from '../../contexts/BudgetModeContext'
import BudgetGraph from '../../components/budget/BudgetGraph'
import BudgetCategories from '../../components/budget/BudgetCategories'
import categories from '../../../demo-data/categories.json'

interface LoadedData {
  categories: Category[]
}

export const loader: LoaderFunction = (): LoadedData => {
  // TODO: Get data from API
  return { categories }
}

export function Component() {
  const { categories } = useLoaderData() as LoadedData
  const [mode, setMode] = useState<BudgetMode>('budget')

  return (
    <BudgetModeContext.Provider value={mode}>
      <Container maxWidth="md">
        <Stack spacing={2}>
          <Box display="flex" justifyContent="center">
            <ToggleButtonGroup
              value={mode}
              onChange={(_, value: BudgetMode) => setMode(value)}
              exclusive
              size="small"
              sx={{ backgroundColor: 'primary.main' }}
            >
              <ToggleButton value="budget">Budget</ToggleButton>
              <ToggleButton value="expenses">Expenses</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <BudgetGraph />
          <BudgetCategories categories={categories} />
        </Stack>
      </Container>
    </BudgetModeContext.Provider>
  )
}
