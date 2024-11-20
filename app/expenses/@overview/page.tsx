import { buildChartData } from '@/utils/utils'
import { ExpensesOverview } from "../components/expenses-overview"
import { CategoryOverview } from "../components/category-overview"
import { groupExpensesByCategory, getCategoriesAndTransactions } from '@/actions/categories'

const OverviewSlot = async () => {
    const groupedExpenses = await groupExpensesByCategory();
    const categories = await getCategoriesAndTransactions();
    const chartData = await buildChartData(groupedExpenses, categories);
    return (
        <div className="flex gap-3 pb-2">
            <ExpensesOverview/>
            <CategoryOverview chartData={chartData} categories={categories} groupedExpenses={groupedExpenses} />
        </div>
    )
}

export default OverviewSlot