import { H2 } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ExpenseForm } from '@/components/ExpenseForm';

const HomePage = () => {
  return (
    <div className="p-9">
      <H2>Home Page</H2>
      <Card className="sm:w-full md:w-1/2 lg:w-1/3">
        <CardHeader>
          <CardTitle>Create expense</CardTitle>
          <CardDescription>Enter details about your expense</CardDescription>
        </CardHeader>
        <CardContent>
          <ExpenseForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
