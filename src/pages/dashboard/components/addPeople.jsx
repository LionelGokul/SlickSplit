import {
  Input,
  Button,
  Typography,
  DialogBody,
  DialogHeader,
  Dialog,
  DialogFooter,
} from '@material-tailwind/react';
import { useFetch } from '@/hooks/useFetch';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import {
  useMaterialTailwindController,
  showAlert,
  showDialogBox,
} from '@/context';

const AddPeople = ({ setTrigger }) => {
  const { sendRequest } = useFetch();
  const [controller, dispatch] = useMaterialTailwindController();

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const email = e.currentTarget[0].value;
      const userId = localStorage.getItem('uid');
      await sendRequest(
        `/users/${userId}/people/add`,
        'POST',
        JSON.stringify({ email }),
        {
          'Content-Type': 'application/json',
        }
      );

      showAlert(dispatch, {
        color: 'light-green',
        content: 'Added Friend Successfuly',
        icon: <CheckCircleIcon strokeWidth={2} className='h-6 w-6' />,
      });
      setTrigger(prev => !prev);

      showDialogBox(dispatch, { open: false, children: <></> });
    } catch (err) {
      showAlert(dispatch, {
        color: 'red',
        content: err.message,
        icon: <ExclamationCircleIcon strokeWidth={2} className='h-6 w-6' />,
      });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <DialogHeader>Add people to your list</DialogHeader>
      <DialogBody>
        <div className='mb-1 flex flex-col gap-6'>
          <Typography
            variant='small'
            color='blue-gray'
            className='-mb-3 font-medium'
          >
            Email
          </Typography>
          <Input
            size='lg'
            placeholder='name@mail.com'
            required
            type='email'
            className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant='text'
          color='red'
          onClick={e => {
            e.preventDefault();
            showDialogBox(dispatch, { open: false, children: <></> });
          }}
          className='mr-1'
        >
          <span>Cancel</span>
        </Button>
        <Button variant='gradient' color='light-green' type='submit'>
          <span>Submit</span>
        </Button>
      </DialogFooter>
    </form>
  );
};

export default AddPeople;
