import { useState } from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'
import Container from '@mui/material/Box'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import BudgetModeContext, { BudgetMode } from '../../contexts/BudgetModeContext'
import BudgetGraph from '../../components/budget/BudgetGraph'
import BudgetCategories from '../../components/budget/BudgetCategories'
import categories from '../../../demo-data/categories.json'

interface LoadedData {
  categories: Category[]
}

export const loader: LoaderFunction = async (): Promise<LoadedData> => {
  // TODO: Get data from API
  return { categories }
}

export function Component() {
  const { categories } = useLoaderData() as LoadedData
  const [mode, setMode] = useState<BudgetMode>('budget')

  return (
    <BudgetModeContext.Provider value={mode}>
      <Container maxWidth="md" margin="0 auto">
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
        <BudgetCategories categories={categories} />
      </Container>
    </BudgetModeContext.Provider>
  )
}
