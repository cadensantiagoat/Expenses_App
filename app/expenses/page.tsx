import { H2 } from '@/components/ui/typography';
import { columns } from './columns';
import { DataTable } from './data-table';
import { CreateExpense } from '@/components/expenses-form/CreateExpense';
import { getTransactions } from '@/utils/actions';

const ExpensesPage = async () => {
  const data = await getTransactions();

  return (
    <div className="p-9">
      <div className="flex justify-between mb-3">
        <H2>Expenses</H2>
        <CreateExpense />
      </div>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ExpensesPage;
