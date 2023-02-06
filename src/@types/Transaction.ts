type TypeTransaction = 'deposit' | 'withdrawal';

type Transaction = {
  id: number;
  description: string;
  value: number;
  type: TypeTransaction;
};

export default Transaction;
