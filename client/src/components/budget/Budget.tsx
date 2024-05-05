import { useContext } from 'react'
import Category from './Category'
import { BudgetPageContext } from '@contexts/BudgetsContext'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import LinearProgress from '@mui/material/LinearProgress'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'

interface BudgetProps {
  budget: PopulatedBudget
}

export default function Budget({ budget }: BudgetProps) {
  const { mode } = useContext(BudgetPageContext)

  let total = 0
  budget.categories.forEach(cat => cat.expenses.forEach(expense => (total += expense.amount)))
  const budgetRatio = total / budget.limit

  return (
    <Accordion
      sx={{
        bgcolor: 'background.200',
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box flex={1}>
          <Typography>{budget.name}</Typography>
          <LinearProgress
            variant="determinate"
            value={budgetRatio < 1 ? budgetRatio * 100 : 100}
            color={budgetRatio < 1 ? 'primary' : 'error'}
            sx={{ marginRight: '1.5rem' }}
          />
        </Box>
        <Typography>${budget.limit}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={1}>
          {budget.categories.map(category => (
            <Category category={category} key={category._id} />
          ))}
        </Stack>
        {mode == 'budget' && (
          <ButtonBase
            sx={{
              mt: 1,
              px: 2,
              py: 1,
              width: '100%',
              borderWidth: 2,
              borderStyle: 'dashed',
              borderRadius: 2,
              borderColor: 'background.400',
              bgcolor: 'background.300',
              justifyContent: 'left',
              gap: 1,
            }}
          >
            <AddBoxOutlinedIcon />
            <Typography>Add Expense</Typography>
          </ButtonBase>
        )}
      </AccordionDetails>
    </Accordion>
  )
}
