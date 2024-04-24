import { useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Button from '@mui/material/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

interface BudgetCategoryProps {
  category: Category
}

export default function BudgetCategory({}: BudgetCategoryProps) {
  const [expanded, setExpanded] = useState(true)

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          backgroundColor: 'primary.main',
          margin: '.5rem 0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Button onClick={() => setExpanded(!expanded)}>
              {expanded ? <ExpandLessIcon color="action" /> : <ExpandMoreIcon color="action" />}
            </Button>
            <Box>
              <p>Category Title</p>
              <LinearProgress />
            </Box>
          </Box>
          <p>Limit</p>
        </Box>
      </Box>
    </Container>
  )
}
