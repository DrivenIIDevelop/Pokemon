import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {} from '@mui/material/styles'

interface ExpenseItemProps {
  expense: Expense
}

export default function ExpenseItem({ expense }: ExpenseItemProps) {
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
    </Box>
  )
}
