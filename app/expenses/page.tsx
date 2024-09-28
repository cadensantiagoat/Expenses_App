import { H2 } from '@/components/ui/typography';

import { CreateExpense } from '@/components/expenses-form/CreateExpense';

const ExpensesPage = async () => {
  return (
    <div className="flex justify-between mb-3">
      <H2>Expenses</H2>
      <CreateExpense />
    </div>
  );
};

export default ExpensesPage;
