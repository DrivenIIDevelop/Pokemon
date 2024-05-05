import { useState, type ChangeEvent } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
import TextField from '@mui/material/TextField'
import Icon from '@mui/material/Icon'
import CheckIcon from '@mui/icons-material/Check'

export interface EditableSummaryContentProps {
  category?: PopulatedCategory
  handleSubmit: (categoryProp: Pick<Category, 'name' | 'icon' | 'limit'>) => void
}

export default function EditableSummaryContent({ category, handleSubmit }: EditableSummaryContentProps) {
  const [name, setName] = useState(category?.name ?? '')
  const [icon] = useState(category?.icon ?? '') // TODO - Allow user to pick an icon
  const [limitStr, setLimitStr] = useState(category ? category?.limit.toString() : '')
  const [limitError, setLimitError] = useState(false)

  return (
    <Box display="flex" justifyContent="left" alignItems="center" gap={0.75} flex={1}>
      <ButtonBase onClick={() => console.log('Show Icon Drawer')}>
        <Icon>{icon ?? 'not_interested'}</Icon>
      </ButtonBase>
      <TextField
        size="small"
        variant="standard"
        placeholder="Name"
        value={name}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
        sx={{ flex: 1 }}
      />
      <TextField
        size="small"
        variant="standard"
        type="number"
        placeholder="0.00"
        value={limitStr}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = event.target.value
          setLimitStr(value)
          if (Number.isNaN(parseFloat(value))) {
            setLimitError(true)
          } else if (limitError) setLimitError(false)
        }}
        inputMode="numeric"
        inputProps={{ type: 'number' }}
        error={Boolean(limitError)}
        sx={{ maxWidth: '25%' }}
      />
      <Button
        size="small"
        variant="contained"
        sx={{ minWidth: 0, p: 0.5 }}
        onClick={() => handleSubmit({ name, limit: parseFloat(limitStr), icon })}
        disabled={name === '' || limitStr === ''}
      >
        <CheckIcon fontSize="small" />
      </Button>
    </Box>
  )
}
