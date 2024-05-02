import Category from './Category'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import LinearProgress from '@mui/material/LinearProgress'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'

interface BudgetProps {
  budget: Budget & { categories: (Category & { expenses: Expense[] })[] }
}

export default function Budget({ budget }: BudgetProps) {
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
      </AccordionDetails>
    </Accordion>
  )
}
