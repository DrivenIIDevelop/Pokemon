import ExpenseItem from './ExpenseItem'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import LinearProgress from '@mui/material/LinearProgress'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

interface BudgetSubCategoryProps {
  subcategory: Subcategory
}

export default function BudgetSubCategory({ subcategory }: BudgetSubCategoryProps) {
  const budgetRatio = subcategory.total / subcategory.limit

  return (
    <Accordion
      variant="outlined"
      sx={{
        bgcolor: 'background.300',
        '&:before': { display: 'none' },
        mt: 1,
        ':first-child': { mt: 0 },
      }}
      disableGutters
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ '& .MuiAccordionSummary-content': { my: 1 } }}>
        <FiberManualRecordIcon />
        <Box flex={1}>
          <Typography>{subcategory.name}</Typography>
          <LinearProgress
            variant="determinate"
            value={budgetRatio < 1 ? budgetRatio * 100 : 100}
            color={budgetRatio < 1 ? 'primary' : 'error'}
            sx={{ marginRight: '1.5rem' }}
          />
        </Box>
        <Typography>${subcategory.limit}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={1} px={0}>
          {subcategory.expenses.map(expense => (
            <ExpenseItem expense={expense} key={expense.id} />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}
