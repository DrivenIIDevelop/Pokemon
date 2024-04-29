import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import LinearProgress from '@mui/material/LinearProgress'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'
import BudgetSubCategory from './BudgetSubCategory'

interface BudgetCategoryProps {
  category: Category
}

export default function BudgetCategory({ category }: BudgetCategoryProps) {
  const budgetRatio = category.total / category.limit

  return (
    <Accordion
      sx={{
        bgcolor: 'background.200',
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
      <AccordionDetails>
        <Stack spacing={1}>
          {category.subcategories.map(subcategory => (
            <BudgetSubCategory subcategory={subcategory} key={subcategory.id} />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}
