import { useContext, useState } from 'react'
import { BudgetPageContext } from '@contexts/BudgetsContext'

import ExpenseDrawer from './ExpenseDrawer'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit'

interface ExpenseProps {
  category: Category
  expense: Expense
}

export default function Expense({ category, expense }: ExpenseProps) {
  const { mode } = useContext(BudgetPageContext)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const date = new Date(expense.date).toLocaleDateString()

  return (
    <Box
      display="flex"
      bgcolor="background.400"
      className="_MuiPaper-outlined"
      px={2}
      borderRadius={2}
      alignItems={'center'}
    >
      <Box flex="1">
        <Typography>{expense.title}</Typography>
        <Typography variant="body2">{date}</Typography>
      </Box>
      <Typography fontSize="115%">${expense.amount}</Typography>
      {mode == 'expenses' && (
        <EditIcon fontSize="small" aria-label="button" sx={{ ml: 1 }} onClick={() => setIsDrawerOpen(true)} />
      )}
      <ExpenseDrawer isOpen={isDrawerOpen} close={() => setIsDrawerOpen(false)} expense={expense} category={category} />
    </Box>
  )
}
