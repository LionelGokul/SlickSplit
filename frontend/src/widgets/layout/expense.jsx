import React from 'react';
import {
  XMarkIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { IconButton, Typography, Button } from '@material-tailwind/react';
import {
  useMaterialTailwindController,
  showAddExpense,
  showAlert,
} from '@/context';
import ExpenseFormElements from './components/expenseFormElements';
import { useFetch } from '@/hooks/useFetch';

export function Expense() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sendRequest } = useFetch();
  const { addExpense } = controller;

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const userId = localStorage.getItem('uid');
      const payload = [...formData.entries()].reduce((acc, [key, value]) => {
        if (acc[key]) {
          if (!Array.isArray(acc[key])) {
            acc[key] = [acc[key]];
          }
          acc[key].push(value);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});
      await sendRequest(
        `/expenses/add`,
        'POST',
        JSON.stringify({
          expense: { ...payload, date: new Date(payload.date) },
          userId,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      showAlert(dispatch, {
        color: 'light-green',
        content: 'Added expense successfuly',
        icon: <CheckCircleIcon strokeWidth={2} className='h-6 w-6' />,
      });
      addExpense.setTrigger(prev => !prev);
    } catch (err) {
      console.log(err);
      showAlert(dispatch, {
        color: 'red',
        content: err.message,
        icon: <ExclamationCircleIcon strokeWidth={2} className='h-6 w-6' />,
      });
    }
  };

  return (
    <aside
      className={`expense fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${
        addExpense.isOpen ? 'translate-x-0' : 'translate-x-96'
      }`}
    >
      <div className='flex items-start justify-between px-6 pt-8'>
        <div>
          <Typography variant='h5' color='blue-gray'>
            Add Expense
          </Typography>
          <Typography className='font-light text-sm text-blue-gray-500'>
            Fill in the details.
          </Typography>
        </div>
        <IconButton
          variant='text'
          color='blue-gray'
          onClick={() => showAddExpense(dispatch, { isOpen: false })}
        >
          <XMarkIcon strokeWidth={2.5} className='h-5 w-5' />
        </IconButton>
      </div>
      <form onSubmit={onSubmit}>
        <div className='py-2 px-6'>
          <ExpenseFormElements />
          <div className='mt-4 flex justify-center gap-2'>
            <Button
              variant='outlined'
              ripple
              type='button'
              onClick={() => showAddExpense(dispatch, { isOpen: false })}
            >
              Cancel
            </Button>
            <Button variant='gradient' ripple type='submit'>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </aside>
  );
}

Expense.displayName = '/src/widgets/layout/expense.jsx';

export default Expense;
