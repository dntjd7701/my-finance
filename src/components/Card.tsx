type CardValueProps = {
  title: string;
  value: number;
  color: 'red' | 'blue' | 'green';
};

const Card = ({ color, title, value }: CardValueProps) => {
  const fg = color === 'red' ? 'bg-red-400' : color === 'blue' ? 'bg-blue-400' : 'bg-green-400';
  return (
    <div className={`flex flex-col items-start justify-center px-2 py-1 w-full h-full rounded-md shadow-xl ${fg}`}>
      <div className='text-[#1E1E1E] font-semibold text-xl'>{title}</div>
      <div className='text-white font-bold text-xl sm:text-4xl drop-shadow-lg'>$ {value}</div>
    </div>
  );
};

export default Card;
