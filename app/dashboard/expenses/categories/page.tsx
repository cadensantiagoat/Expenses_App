import { CategoryTable } from "../../components/CollapsibleTable"
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