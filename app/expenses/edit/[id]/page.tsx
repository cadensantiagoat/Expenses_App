import { prisma } from '@/utils/db';
import { UpdateExpense } from '@/components/expenses-form/UpdateExpense';
import { Modal } from '@/components/Dialog';

const getTransactionById = async (id: string) => {
  const transaction = await prisma.transaction.findUnique({
    where: {
      id,
    },
  });

  return transaction;
};

const EditPage = async ({ params }: { params: { id: string } }) => {
  const transaction = await getTransactionById(params.id);

  return (
    <div>
      <Modal
        title={'Edit expense'}
        description={`Required fields are marked with an asterisk *`}
      >
        <UpdateExpense transaction={transaction} />
      </Modal>
    </div>
  );
};

export default EditPage;
