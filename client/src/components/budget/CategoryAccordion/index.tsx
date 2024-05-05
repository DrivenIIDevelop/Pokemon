import { useState, useContext } from 'react'
import { BudgetPageContext, BudgetsDispatchContext } from '@contexts/BudgetsContext'
import { updateCatgeroy, deleteCategory } from '@api/categories'

import Expense from '../Expense'
import CategoryAccordianSummary from './Summary'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionActions from '@mui/material/AccordionActions'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'

interface CategoryProps {
  category: PopulatedCategory
}

export default function Category({ category }: CategoryProps) {
  const { mode } = useContext(BudgetPageContext)
  const budgetsDispatch = useContext(BudgetsDispatchContext)

  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isShowingWarning, setIsShowingWarning] = useState(false)

  return (
    <Accordion
      variant="outlined"
      sx={{
        bgcolor: 'background.300',
        '&:before': { display: 'none' },
      }}
      disableGutters
      expanded={isExpanded}
    >
      <CategoryAccordianSummary
        category={category}
        mode={mode}
        toggleExpanded={() => setIsExpanded(!isExpanded)}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        updateCategory={async props => {
          try {
            const updatedCategory = await updateCatgeroy(category._id, props)
            budgetsDispatch({
              type: 'updateCategory',
              budgetId: category.budget!,
              categoryId: category._id,
              updatedCategory,
            })
          } catch (error) {
            // TODO: Handle errors properly
            console.error('Error: Unable to update category', error)
          }
          setIsEditing(false)
        }}
      />
      <AccordionDetails sx={{ display: isEditing ? 'none' : 'block', pb: mode == 'budget' ? 0 : undefined }}>
        <Stack spacing={1}>
          {category.expenses.map(expense => (
            <Expense expense={expense} category={category} key={expense._id} />
          ))}
        </Stack>
      </AccordionDetails>
      {mode == 'budget' && (
        <AccordionActions>
          <Button onClick={() => setIsShowingWarning(true)}>Delete</Button>
          <Dialog
            open={isShowingWarning}
            onClose={() => setIsShowingWarning(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle>{'Delete Category?'}</DialogTitle>
            <DialogActions>
              <Button onClick={() => setIsShowingWarning(false)}>Cancel</Button>
              <Button
                onClick={async () => {
                  setIsShowingWarning(false)
                  try {
                    await deleteCategory(category._id)
                    budgetsDispatch({
                      type: 'removeCategory',
                      budgetId: category.budget!,
                      categoryId: category._id,
                    })
                  } catch (error) {
                    // TODO: Handle errors properly
                    console.error('Error: Unable to delete category', error)
                  }
                }}
                autoFocus
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </AccordionActions>
      )}
    </Accordion>
  )
}
