import Stack from '@mui/material/Stack'
import BudgetCategory from './BudgetCategory'

interface BudgetCategoriesProps {
  categories: Category[]
}

export default function BudgetCategories({ categories }: BudgetCategoriesProps) {
  return (
    <Stack spacing={1.5}>
      {categories.map(category => (
        <BudgetCategory category={category} key={category.id} />
      ))}
    </Stack>
  )
}
