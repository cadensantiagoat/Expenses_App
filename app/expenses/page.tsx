import { H2 } from '@/components/ui/typography';
import { columns } from './columns';
import { DataTable } from './data-table';
import { ExpenseForm } from '@/components/expenses-form/ExpenseForm';
import { getTransactions } from '@/utils/actions';

const ExpensesPage = async () => {
  const data = await getTransactions();

  return (
    <div className="p-9">
      <div className="flex justify-between">
        <H2>Expenses</H2>
        <ExpenseForm />
      </div>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ExpensesPage;
