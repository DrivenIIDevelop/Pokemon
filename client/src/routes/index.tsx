import Image from 'mui-image'
import { Box, Grid, Typography, Button } from '@mui/material'
import { styled } from '@mui/material'

const StyledImage = styled(Image)({
  maxWidth: '800px',
  width: '100%',
})

export function Component() {
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
      <Grid container alignItems="center" width={'100%'} px={5} columnSpacing={{ md: 10 }}>
        <Grid item xs={12} md={7}>
          <StyledImage src="/src/assets/images/home-hero.png" duration={325} />
        </Grid>
        <Grid item xs={12} md={5} marginBlockStart={{ xs: 5, md: 0 }}>
          <Typography sx={theme => theme.typography.h1} marginBlockEnd={2}>
            Your Financial Future Begins!
          </Typography>
          <Typography sx={theme => theme.typography.h2} marginBlockEnd={'5rem'}>
            At Windfall, we believe in helping you achieve financial success and security through effective budgeting
            and smart money management.
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: { xs: '100%', sm: '150px' },
              marginInlineEnd: { xs: 0, sm: '2rem' },
              marginBlockEnd: { xs: '1rem', sm: '0' },
              fontSize: '1.8rem',
              textTransform: 'capitalize',
            }}
          >
            Sign Up
          </Button>
          <Button
            variant="contained"
            sx={{
              width: { xs: '100%', sm: '150px' },
              fontSize: '1.8rem',
              textTransform: 'capitalize',
            }}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
