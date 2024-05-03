import { useContext, useState } from 'react'
import Expense from './Expense'
import { BudgetPageContext } from '@contexts/BudgetsContext'

import ExpenseDrawer from './ExpenseDrawer'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import AddIcon from '@mui/icons-material/Add'

interface CategoryProps {
  category: Category & { expenses: Expense[] }
}

export default function Category({ category }: CategoryProps) {
  const { mode } = useContext(BudgetPageContext)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  let total = 0
  category.expenses.forEach(expense => (total += expense.amount))
  const budgetRatio = total / category.limit

  return (
    <Accordion
      variant="outlined"
      sx={{
        bgcolor: 'background.300',
        '&:before': { display: 'none' },
      }}
      disableGutters
      expanded={isExpanded}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ '& .MuiAccordionSummary-content': { my: 1, gap: 1 } }}>
        <FiberManualRecordIcon onClick={() => setIsExpanded(!isExpanded)} />
        <Box flex={1} onClick={() => setIsExpanded(!isExpanded)}>
          <Typography>{category.name}</Typography>
          <LinearProgress
            variant="determinate"
            value={budgetRatio < 1 ? budgetRatio * 100 : 100}
            color={budgetRatio < 1 ? 'primary' : 'error'}
            sx={{ marginRight: '1.5rem' }}
          />
        </Box>
        <Typography onClick={() => setIsExpanded(!isExpanded)}>${category.limit}</Typography>
        <Button size="small" variant="contained" sx={{ minWidth: 0, p: 0.5 }} onClick={() => setIsDrawerOpen(true)}>
          {mode == 'expenses' ? <AddIcon strokeWidth={10} /> : <div>Edit</div>}
        </Button>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={1}>
          {category.expenses.map(expense => (
            <Expense expense={expense} category={category} key={expense._id} />
          ))}
        </Stack>
      </AccordionDetails>
      {
        mode == 'expenses' ? (
          <ExpenseDrawer category={category} isOpen={isDrawerOpen} close={() => setIsDrawerOpen(false)} />
        ) : (
          <div />
        ) // TODO: Edit category
      }
    </Accordion>
  )
}
