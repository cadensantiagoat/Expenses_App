import { DataTable } from './data-table';
import { columns } from './columns';
import { getTransactions } from '@/utils/actions';

const ExpensesLayout = async ({ children }: { children: React.ReactNode }) => {
  const data = await getTransactions();
  return (
    <div className="p-9">
      {children}
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ExpensesLayout;
