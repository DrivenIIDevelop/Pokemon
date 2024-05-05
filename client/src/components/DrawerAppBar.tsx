import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { ThemeProvider } from '@emotion/react'
import theme from '../theme'
import { CreditCardOutlined, ExitToApp, QuizOutlined, ReceiptLongOutlined, SavingsOutlined } from '@mui/icons-material'
import { Badge } from '@mui/material'

const drawerWidth = 240

export default function DrawerAppBar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ alignContent: 'flex-start' }}>
      <List sx={{ paddingLeft: '10px' }}>
        <ListItem>Windfall</ListItem>

        <ListItem>
          <SavingsOutlined />
          <ListItemButton sx={{ textAlign: 'flex-start' }}>
            <ListItemText>
              <a href="/budget">Budget</a>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <CreditCardOutlined />
          <ListItemButton sx={{ textAlign: 'flex-start' }}>
            <a href="/accounts"> Accounts</a>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <QuizOutlined />
          <ListItemButton sx={{ textAlign: 'flex-start' }}>
            <a href="/budget/quiz">Quiz</a>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ReceiptLongOutlined />
          <ListItemButton sx={{ textAlign: 'flex-start' }}>
            <a href="/transactions">Transaction History</a>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <Badge
            color="warning"
            badgeContent="3"
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{ paddingLeft: '15px', marginRight: '13px' }}
          />
          <ListItemButton sx={{ textAlign: 'flex-start' }}>
            <a href="/expenses">Sort Expenses</a>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider variant="middle" sx={{ borderColor: '#00000099', borderBottomWidth: '3px', width: '75%' }} />
      <List>
        <ListItem sx={{ paddingLeft: '30px' }}>
          <ExitToApp />
          <ListItemButton sx={{ textAlign: 'flex-start' }}>
            <a href="/login">Login</a>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  const container = window !== undefined ? () => window.document.body : undefined

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar sx={{ backgroundColor: '#e5deb7' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <img alt="App Logo" src="./src/images/Group 277.png" />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'block' } }}>
              {' '}
              Windfall
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button sx={{ color: '#00000099' }}>
                <SavingsOutlined />
                <Typography sx={{ paddingLeft: '10px' }}>
                  <a href="/budget">Budget</a>
                </Typography>
              </Button>
              <Button sx={{ color: '#00000099' }}>
                <CreditCardOutlined />
                <Typography sx={{ paddingLeft: '10px' }}>
                  <a href="/accounts"> Accounts</a>
                </Typography>
              </Button>
              <Button sx={{ color: '#00000099' }}>
                <QuizOutlined />
                <Typography sx={{ paddingLeft: '10px' }}>
                  <a href="/budget/quiz">Quiz</a>
                </Typography>
              </Button>
              <Button sx={{ color: '#00000099' }}>
                <ReceiptLongOutlined />
                <Typography sx={{ paddingLeft: '10px' }}>
                  <a href="/transactions">Transaction History</a>
                </Typography>
              </Button>
              <Button sx={{ color: '#00000099' }}>
                <Badge
                  color="warning"
                  badgeContent="3"
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  sx={{ paddingLeft: '15px', marginRight: '13px' }}
                />
                <Typography sx={{ paddingLeft: '10px' }}>
                  <a href="/expenses">Sort Expenses</a>
                </Typography>
              </Button>
              <Button sx={{ color: '#00000099' }}>
                <ExitToApp />
                <Typography sx={{ paddingLeft: '10px' }}>
                  <a href="/login">Login</a>
                </Typography>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { backgroundColor: '#bebba2', boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
        </Box>
      </Box>
    </ThemeProvider>
  )
}
