import { CategoryTable } from "../../../expenses/components/category-table"
import {getCategoriesAndTransactions} from '@/actions/categories'


const CategoriesPage = async () => {
    const data = await getCategoriesAndTransactions()
return (
        <div>
Category Page
        </div>
)
}

export default CategoriesPage