import { useState, useContext } from 'react'
import { BudgetsDispatchContext } from '@contexts/BudgetsContext'
import { createCategory } from '@api/categories'

import EditableSummaryContent from './EditableSummaryContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'

interface NewCategoryProps {
  budgetId: string
}

export default function NewCategory({ budgetId }: NewCategoryProps) {
  const budgetsDispatch = useContext(BudgetsDispatchContext)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Box
      mt={1}
      px={2}
      py={1}
      borderRadius={2}
      borderColor={'background.400'}
      bgcolor={'background.300'}
      sx={{ borderRadius: 2, borderStyle: 'dashed' }}
    >
      {isEditing ? (
        <EditableSummaryContent
          handleSubmit={async props => {
            try {
              const category = await createCategory({ ...props, budget: budgetId })
              budgetsDispatch({
                type: 'addCategory',
                budgetId: budgetId,
                category,
              })
            } catch (error) {
              // TODO: Handle errors properly
              console.error('Error: Unable to create new category', error)
            }
            setIsEditing(false)
          }}
        />
      ) : (
        <ButtonBase
          sx={{
            width: '100%',
            justifyContent: 'left',
            gap: 1,
          }}
          onClick={() => setIsEditing(true)}
        >
          <AddBoxOutlinedIcon />
          <Typography>Add Expense</Typography>
        </ButtonBase>
      )}
    </Box>
  )
}
