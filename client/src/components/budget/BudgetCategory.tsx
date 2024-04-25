import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'

interface BudgetCategoryProps {
  category: Category
}

export default function BudgetCategory({ category }: BudgetCategoryProps) {
  const budgetRatio = category.total / category.limit

  return (
    <Accordion
      sx={{
        borderRadius: 2,
        boxShadow: 1,
        bgcolor: 'background.200',
        '&:before': {
          display: 'none',
        },
      }}
      disableGutters
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 1 }}
      >
        <Box flex={1}>
          <Typography>{category.name}</Typography>
          <LinearProgress
            variant="determinate"
            value={budgetRatio < 1 ? budgetRatio * 100 : 100}
            color={budgetRatio < 1 ? 'primary' : 'error'}
            sx={{ marginRight: '1.5rem' }}
          />
        </Box>
        <Typography>${category.limit}</Typography>
      </AccordionSummary>
      <AccordionDetails>Sub-Categories</AccordionDetails>
    </Accordion>
  )
}
