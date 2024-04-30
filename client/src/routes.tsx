import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import DrawerAppBar from './components/DrawerAppBar'
import './index.css'

/** The main page layout */
export function Component() {
  return (
    <Box
      sx={{
        height: '100vh',
      }}
    >
      <DrawerAppBar />
      <Outlet />
    </Box>
  )
}
