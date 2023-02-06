import Transaction from '../@types/Transaction';
import tw from 'tailwind-styled-components';

type TableProps = {
  data: Transaction[];
  onDelete: Function;
};

const Table = (props: TableProps) => {
  return (
    <div className='block w-full overflow-x-auto'>
      <table className='table-auto items-center w-full bg-transparent border-collapse'>
        <thead>
          <tr>
            <CellHeader className='w-2'>구분</CellHeader>
            <CellHeader>설명</CellHeader>
            <CellHeader>금액</CellHeader>
            <CellHeader className='w-2'>삭제</CellHeader>
          </tr>
        </thead>
        <tbody>
          {props.data?.map((item) => {
            return (
              <tr key={item.id}>
                <Cell className={`text-center font-bold ${item.type === 'deposit' ? 'text-green-600' : 'text-red-600'} `}>
                  {item.type === 'deposit' ? (
                    <div className='flex flex-col items-center'>
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-4'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75' />
                      </svg>
                      <span>입금</span>
                    </div>
                  ) : (
                    <div className='flex flex-col items-center'>
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-4'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75' />
                      </svg>
                      <span>출금</span>
                    </div>
                  )}
                </Cell>
                <Cell>{item.description}</Cell>
                <Cell>$ {item.value}</Cell>
                <Cell className='hover:text-red-700 text-center'>
                  <button
                    onClick={() => {
                      props.onDelete(item);
                    }}>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                      />
                    </svg>
                  </button>
                </Cell>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
const CellHeader = tw.th`
px-6 align-middle border border-2 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-[#242424] text-white border-[#1E1E1E]
`;

const Cell = tw.td`
border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm font-bold whitespace-nowrap p-4 capitalize text-left
`;
export default Table;
