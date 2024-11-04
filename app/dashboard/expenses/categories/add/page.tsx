import CategoryForm from '@/components/forms/category-form'
import { H3 } from '@/components/ui/typography'

const defaultCategory = {
  name: '',
  color: '',
  icon: '',
}

const AddCategoryPage = async () => {
  return (
    <div className='flex flex-col space-y-6'>
      <H3>Add category</H3>
      <div className='border border-black p-6 max-w-md rounded-md'>
        <CategoryForm category={defaultCategory} />
      </div>
    </div>
  )
}

export default AddCategoryPage
