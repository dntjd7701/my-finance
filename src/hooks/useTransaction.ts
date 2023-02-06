import { useEffect, useState } from 'react';
import Transaction from '../@types/Transaction';

const listApi: Transaction[] = [
  {
    id: 0,
    description: 't1',
    value: 500,
    type: 'deposit',
  },
  {
    id: 1,
    description: 't2',
    value: 200,
    type: 'withdrawal',
  },
  {
    id: 2,
    description: 't3',
    value: 200,
    type: 'deposit',
  },
  {
    id: 3,
    description: 't4',
    value: 200,
    type: 'withdrawal',
  },
];

export const useTransaction = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const [deposit, setDeposit] = useState<number>(0);
  const [withdrawal, setWithdrawal] = useState<number>(0);

  useEffect(() => {
    const fetch = async () => {
      const rst: Transaction[] = await new Promise((resolve) => resolve(listApi));
      let depositSum = 0;
      let widthdrawalSum = 0;

      rst.forEach((el) => {
        if (el.type === 'deposit') depositSum += el.value;
        else widthdrawalSum += el.value;
      });
      setData(rst);
      setDeposit(depositSum);
      setWithdrawal(widthdrawalSum);
    };
    fetch();
  }, []);

  const add = (item: Transaction) => {
    const maxId = Math.max(...data.map((el) => el.id));
    item.id = maxId + 1;

    if (item.type === 'deposit') {
      setDeposit(deposit + item.value);
    } else {
      setWithdrawal(withdrawal + item.value);
    }
    setData([...data, item]);
  };

  const remove = (item: Transaction) => {
    console.log('item:', item);
    if (item.type === 'deposit') {
      setDeposit(deposit - item.value);
    } else {
      setWithdrawal(withdrawal - item.value);
    }

    data.splice(data.indexOf(item), 1);
    setData([...data]);
  };

  return { data, deposit, withdrawal, add, remove };
};
