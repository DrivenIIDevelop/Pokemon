import Image from 'mui-image'
import { styled } from '@mui/material'

// Does not work?
// interface HeroImageProps {
//   heroImage: HeroImage
// }

interface HeroImageProps {
  imageUrl: string
  imageAlt: string
  easing?: string
  duration?: number
}

const StyledImage = styled(Image)({
  maxWidth: '800px',
  width: '100%',
})

export default function HeroImage(heroImage: HeroImageProps) {
  return (
    <>
      <StyledImage src={heroImage.imageUrl} alt={heroImage.imageAlt} />
    </>
  )
}

// /src/assets/images/home-hero.png
