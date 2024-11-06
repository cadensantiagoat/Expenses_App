import CategoryForm from '@/components/forms/category-form'
import { H4 } from '@/components/ui/typography'

const defaultCategory = {
  name: '',
  color: '',
  icon: '',
}

const AddCategoryPage = async () => {
  return (
    <div className='flex flex-col space-y-6 col-span-5'>
      <div className='border border-black p-6 max-w-md rounded-md'>
        <div className='pb-6'>
          <H4>Create a category</H4>
        </div>

        <CategoryForm category={defaultCategory} />
      </div>
    </div>
  )
}

export default AddCategoryPage
