import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'

/** The main page layout */
export function Component() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        backgroundColor: 'background.default',
      }}
    >
      <Outlet />
    </Box>
  )
}
