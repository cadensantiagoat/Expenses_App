import { getAllExpenses } from '@/actions/expenses';
import { getCurrentUser } from '@/utils/auth';
import { H3, Small, Muted } from '@/components/ui/typography';
import { formatDate } from '@/utils/utils';
import Link from 'next/link';

const ExpensesPage = async () => {
  const user = await getCurrentUser();
  const expenses = await getAllExpenses(user.id);

  return (
    <div className="p-3">
      <H3>Expenses</H3>
      <div className="pt-3">
        {expenses.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  );
};

export default ExpensesPage;

const ExpenseCard = ({ expense }: { expense: any }) => {
  return (
    <Link href={`/dashboard/expenses/${expense.id}`}>
      <div className="rounded-xl bg-card text-card-foreground py-2 px-3 mb-2 hover:shadow transition-shadow">
        <div className="flex w-full">
          <div className="flex-initial w-[25%]">
            <Muted>title</Muted>
            <Small>{expense.title}</Small>
          </div>
          <div className="w-[25%] md:visible sm:invisible">
            <Muted>category</Muted>
            <Small>{expense.categoryName}</Small>
          </div>
          <div className="md:w-[25%] sm:w-1/2">
            <Muted>amount</Muted>
            <Small>${expense.amount.toString()}</Small>
          </div>
          <div className="md:w-[25%] sm:w-1/2">
            <Muted>due</Muted>
            <Small>{formatDate(expense.monthlyDueDate)}</Small>
          </div>
        </div>
      </div>
    </Link>
  );
};
