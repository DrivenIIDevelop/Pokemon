import { useState } from 'react'
import type { BudgetMode } from '@contexts/BudgetsContext'

import EditableSummaryContent, { EditableSummaryContentProps } from './EditableSummaryContent'
import ExpenseDrawer from '../ExpenseDrawer'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Icon from '@mui/material/Icon'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'

export interface CategoryAccordianSummaryProps {
  category: PopulatedCategory
  mode: BudgetMode
  toggleExpanded: () => void
  isEditing: boolean
  setIsEditing: (value: boolean) => void
  updateCategory: EditableSummaryContentProps['handleSubmit']
}

export default function CategoryAccordianSummary({
  category,
  mode,
  toggleExpanded,
  isEditing,
  setIsEditing,
  updateCategory,
}: CategoryAccordianSummaryProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  let total = 0
  category.expenses.forEach(expense => (total += expense.amount))
  const budgetRatio = total / category.limit

  return (
    <AccordionSummary
      sx={{
        '& .MuiAccordionSummary-content': { my: 1, gap: 0.75 },
        '&.Mui-expanded .MuiExpandIcon': {
          transform: 'rotate(180deg)',
        },
      }}
    >
      {isEditing ? (
        <EditableSummaryContent category={category} handleSubmit={props => void updateCategory(props)} />
      ) : (
        <>
          <ExpandMoreIcon
            onClick={toggleExpanded}
            className="MuiExpandIcon"
            sx={{
              transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;',
              opacity: 0.54,
            }}
          />
          <Box onClick={toggleExpanded} flex={1} display="flex" alignItems={'center'}>
            {category.icon && (
              <Icon fontSize="small" sx={{ mr: 0.75 }}>
                {category.icon}
              </Icon>
            )}
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
          </Box>
          <Button
            size="small"
            variant="contained"
            sx={{ minWidth: 0, p: 0.5 }}
            onClick={() => (mode == 'expenses' ? setIsDrawerOpen(true) : setIsEditing(true))}
          >
            {mode == 'expenses' ? <AddIcon fontSize="small" /> : <EditIcon fontSize="small" />}
          </Button>
        </>
      )}
      <ExpenseDrawer category={category} isOpen={isDrawerOpen} close={() => setIsDrawerOpen(false)} />
    </AccordionSummary>
  )
}
