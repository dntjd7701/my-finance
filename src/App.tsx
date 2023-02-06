import { useState, Fragment } from 'react';
import Card from './components/Card';
import Table from './components/Table';
import { useTransaction } from './hooks/useTransaction';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import Transaction from './@types/Transaction';

function App() {
  const { data, deposit, withdrawal, add, remove } = useTransaction();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<Transaction>();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    reset();
    setIsOpen(false);
  };

  const handleSave = (item: Transaction) => {
    add(item);
    setIsOpen(false);
    reset();
  };

  const handleDelete = (item: Transaction) => {
    remove(item);
  };

  return (
    <div className='flex flex-col bg-[#1E1E1E] w-full h-screen text-white'>
      <div className='fixed flex flex-row justify-between items-center w-full h-16 px-4 bg-[#242424] text-lg text-sans font-black shadow-2xl'>
        <div>Kang's finance</div>
        <div className='bg-green-700 h-max p-2 rounded-lg active:bg-green-900 hover:bg-green-800'>
          <button onClick={openModal}>추가하기</button>
        </div>
      </div>

      <div className='mt-20'>
        <div className='fixed flex flex-row w-full justify-around gap-x-2 px-4'>
          <Card title='잔액' color='blue' value={deposit - withdrawal} />
          <Card title='입금' color='green' value={deposit} />
          <Card title='출금' color='red' value={withdrawal} />
        </div>
      </div>

      <div className='p-4 mt-20 bg-[#1E1E1E] overflow-auto'>
        <div className='rounded-lg bg-[#242424]'>
          <div className='rounded-t mb-0 px-4 py-3 border-0'>
            <div className='flex flex-wrap items-center'>
              <h3 className='font-semibold text-lg'>내역</h3>
            </div>
          </div>
        </div>

        {data.length == 0 ? <div className='text-center p-4 text-gray-400'>내역이 존재하지 않습니다.</div> : <Table data={data} onDelete={handleDelete} />}
      </div>

      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as='div' className='relative z-10' onClose={closeModal}>
            <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 overflow-y-auto'>
              <div className='flex min-h-full items-center justify-center p-4 text-center'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'>
                  <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-[#242424] p-6 text-left align-middle shadow-xl transition-all'>
                    <Dialog.Title as='h3' className='text-lg font-bold leading-6 text-white'>
                      새로운 내역 추가하기
                    </Dialog.Title>
                    <div className='mt-4'>
                      <div>
                        <form className='flex flex-col bg-[#242424] gap-y-4' onSubmit={handleSubmit(handleSave)}>
                          <input className='p-2 border rounded-sm bg-[#1E1E1E] text-white' type='text' required placeholder='설명' {...register('description')} />
                          <input
                            className='p-2 border rounded-sm  bg-[#1E1E1E] text-white'
                            type='number'
                            required
                            placeholder='금액'
                            {...register('value', {
                              valueAsNumber: true,
                            })}
                          />
                          <select className='p-2 border rounded-sm bg-[#1E1E1E] text-white' {...register('type')}>
                            <option value='deposit'>출금</option>
                            <option value='withdrawal'>입금</option>
                          </select>

                          <div className='flex mt-4 justify-end gap-x-4'>
                            <button
                              type='button'
                              className='inline-flex justify-center rounded-md border border-transparent bg-red-100 w-24 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                              onClick={closeModal}>
                              취소
                            </button>
                            <button
                              type='submit'
                              className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 w-24 px-4 py-2 text-sm font-bold text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'>
                              저장
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </div>
  );
}

export default App;
