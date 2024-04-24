import { useState } from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Button from '@mui/material/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import Typography from '@mui/material/Typography'

interface BudgetCategoryProps {
  category: Category
}

export default function BudgetCategory({ category }: BudgetCategoryProps) {
  const [expanded, setExpanded] = useState(true)
  const budgetRatio = category.total / category.limit

  return (
    <Stack>
      <Box
        display="flex"
        alignItems="center"
        justifyItems="center"
        gap="1rem"
        bgcolor="primary.main"
        borderRadius=".5rem"
        boxShadow={1}
      >
        <Button onClick={() => setExpanded(!expanded)} sx={{ minWidth: 0 }}>
          {expanded ? <ExpandLessIcon color="action" /> : <ExpandMoreIcon color="action" />}
        </Button>
        <Box flex={1}>
          <Typography>{category.name}</Typography>
          <LinearProgress
            variant="determinate"
            value={budgetRatio < 1 ? budgetRatio * 100 : 100}
            color={budgetRatio < 1 ? 'secondary' : 'error'}
            sx={{ marginRight: '1.5rem' }}
          />
        </Box>
        <Typography marginRight=".75rem">${category.limit}</Typography>
      </Box>
    </Stack>
  )
}
