import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Typography } from '@material-tailwind/react';

const DateInputElement = ({ name, label, id, isRequired }) => {
  const [date, setDate] = useState(Date.now);
  const onChange = value => {
    setDate(value);
  };
  return (
    <div className='mb-1 flex flex-col gap-6'>
      <Typography
        variant='small'
        color='blue-gray'
        className='-mb-3 font-medium'
      >
        {label}
      </Typography>
      <DatePicker
        name={name}
        id={id}
        showIcon
        selected={date}
        onChange={onChange}
        required={isRequired}
      />
    </div>
  );
};

export default DateInputElement;
