import { useState, useContext } from 'react'
import { createExpense } from '@api/expenses'
import { BudgetsDispatchContext } from '@contexts/BudgetsContext'

import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import TextField from '@mui/material/TextField'

interface DrawerContentProps {
  isOpen: boolean
  close: () => void
  categories: Category[]
  category?: Category
}

export default function ExpenseDrawer({ isOpen, close, categories, category: originalCatgory }: DrawerContentProps) {
  const budgetsDispatch = useContext(BudgetsDispatchContext)

  const [category, setCategory] = useState<Category | undefined>(originalCatgory)
  const [title, setTitle] = useState('')
  const [amountStr, setAmountStr] = useState('')
  const [amountError, setAmountError] = useState<string>()

  const closeAndReset = () => {
    close()
    setCategory(undefined)
    setTitle('')
    setAmountStr('')
    setAmountError(undefined)
  }

  const createNewExpesnse = async () => {
    if (title === '' || amountStr === undefined || category === undefined) {
      console.log({ title, amount: amountStr, category })
      throw new Error("Can't create new expense! Atleast one value is empty.")
    } else {
      try {
        const amount = parseFloat(amountStr)
        const expense = await createExpense({ title, amount, category: category._id, date: new Date() })
        budgetsDispatch({ type: 'addExpense', budgetId: category.budget!, expense })
        closeAndReset()
      } catch (error) {
        // TODO: Handle errors properly
        console.error('Error: Unable to create new expense', error)
        closeAndReset()
      }
    }
  }

  return (
    <Drawer anchor="bottom" open={isOpen} onClose={closeAndReset}>
      <Box display="flex" flexDirection="column" p={2}>
        <Box display="grid" gridTemplateColumns="1fr 3fr 1fr" alignItems="center" mb={2}>
          <Button
            onClick={() => {
              if (category && !originalCatgory) setCategory(undefined)
              else closeAndReset()
            }}
            color="inherit"
            size="large"
            sx={{ p: 0 }}
          >
            Back
          </Button>
          <Typography variant="h5" sx={{ justifySelf: 'center', fontWeight: 600 }}>
            Add Expense
          </Typography>
          {Boolean(category && amountStr && title && !amountError) && (
            <Button
              onClick={() => {
                void createNewExpesnse()
              }}
              color="inherit"
              size="large"
              sx={{ p: 0 }}
            >
              Create
            </Button>
          )}
        </Box>
        {category ? (
          <Box>
            <TextField
              label="Title"
              fullWidth
              value={title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(event.target.value)
              }}
            />
            <TextField
              label="Amount"
              fullWidth
              value={amountStr === null ? '' : amountStr}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value
                setAmountStr(value)
                if (Number.isNaN(parseFloat(value))) {
                  setAmountError('Invalid characters')
                } else if (amountError) setAmountError(undefined)
              }}
              inputMode="numeric"
              inputProps={{ type: 'number' }}
              error={Boolean(amountError)}
              helperText={amountError}
            />
          </Box>
        ) : (
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, 100px)"
            justifyContent="space-around"
            alignItems="center"
            justifyItems="center"
            columnGap={1.5}
            rowGap={2}
          >
            {categories.map(category => (
              <CategoryOption
                key={category._id}
                title={category.name}
                icon={category.icon}
                onClick={() => setCategory(category)}
              />
            ))}
          </Box>
        )}
      </Box>
    </Drawer>
  )
}

interface CategoryOptionProps {
  title: string
  icon?: string
  onClick?: () => void
}

function CategoryOption({ title, icon, onClick }: CategoryOptionProps) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={1} onClick={onClick}>
      {icon ? <Icon>{icon}</Icon> : <NotInterestedIcon />}{' '}
      <Typography variant="body2" align="center">
        {title}
      </Typography>
    </Box>
  )
}
