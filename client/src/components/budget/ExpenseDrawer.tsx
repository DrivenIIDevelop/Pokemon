import { useState, useContext, type JSX } from 'react'
import { createExpense, updateExpense } from '@api/expenses'
import { BudgetsDispatchContext } from '@contexts/BudgetsContext'

import Drawer from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import TextField from '@mui/material/TextField'

type ExpenseDrawerProps = ExpenseDrawerBaseProps &
  Partial<ExpenseDrawerCreateProps> &
  Partial<ExpenseDrawerCreateInCategoryProps> &
  Partial<ExpenseDrawerEditProps>

export default function ExpenseDrawer(props: ExpenseDrawerCreateProps): JSX.Element
export default function ExpenseDrawer(props: ExpenseDrawerCreateInCategoryProps): JSX.Element
export default function ExpenseDrawer(props: ExpenseDrawerEditProps): JSX.Element
export default function ExpenseDrawer({
  isOpen,
  close,
  categories,
  category: definedCatgory,
  expense,
}: ExpenseDrawerProps) {
  const budgetsDispatch = useContext(BudgetsDispatchContext)

  const [category, setCategory] = useState<Category>()
  const [title, setTitle] = useState('')
  const [amountStr, setAmountStr] = useState('')
  const [amountError, setAmountError] = useState<string>()

  const reset = () => {
    setCategory(definedCatgory)
    setTitle(expense?.title ?? '')
    setAmountStr(expense ? expense?.amount.toString() : '')
    setAmountError(undefined)
  }

  const handleSubmit = async () => {
    if (title === '' || amountStr === undefined || category === undefined) {
      console.log({ title, amount: amountStr, category })
      throw new Error("Can't create new expense! Atleast one value is empty.")
    } else {
      try {
        const amount = parseFloat(amountStr)
        if (expense) {
          const updatedExpense = await updateExpense(expense._id, { title, amount, category: category._id })
          budgetsDispatch({
            type: 'updateExpense',
            budgetId: category.budget!,
            categoryId: category._id,
            expenseId: expense._id,
            updatedExpense,
          })
        } else {
          const createdExpense = await createExpense({ title, amount, category: category._id, date: new Date() })
          budgetsDispatch({
            type: 'addExpense',
            budgetId: category.budget!,
            categoryId: category._id,
            expense: createdExpense,
          })
        }
      } catch (error) {
        // TODO: Handle errors properly
        console.error('Error: Unable to create new expense', error)
      }
      close()
    }
  }

  return (
    <Drawer anchor="bottom" open={isOpen} onClose={close} onTransitionEnter={reset}>
      <Box display="flex" flexDirection="column" p={2}>
        <Box display="grid" gridTemplateColumns="1fr 3fr 1fr" alignItems="center" mb={2}>
          <Button
            onClick={() => {
              if (categories && category) reset()
              else close()
            }}
            color="inherit"
            size="large"
            sx={{ p: 0 }}
          >
            Back
          </Button>
          <Typography variant="h5" sx={{ justifySelf: 'center', fontWeight: 600 }}>
            {expense ? 'Edit' : 'Add'} Expense
          </Typography>
          {Boolean((expense || category) && amountStr && title && !amountError) && (
            <Button
              onClick={() => {
                void handleSubmit()
              }}
              color="inherit"
              size="large"
              sx={{ p: 0 }}
            >
              {expense ? 'Update' : 'Create'}
            </Button>
          )}
        </Box>
        {categories && !category ? (
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
              <Box
                key={category._id}
                display="flex"
                flexDirection="column"
                alignItems="center"
                p={1}
                onClick={() => setCategory(category)}
              >
                {category.icon ? <Icon>{category.icon}</Icon> : <NotInterestedIcon />}
                <Typography variant="body2" align="center">
                  {category.name}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Stack spacing={1}>
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
          </Stack>
        )}
      </Box>
    </Drawer>
  )
}

interface ExpenseDrawerBaseProps {
  isOpen: boolean
  close: () => void
}
export interface ExpenseDrawerCreateProps extends ExpenseDrawerBaseProps {
  categories: Category[]
}
export interface ExpenseDrawerCreateInCategoryProps extends ExpenseDrawerBaseProps {
  category: Category
}
export interface ExpenseDrawerEditProps extends ExpenseDrawerBaseProps {
  category: Category
  expense: Expense
}
