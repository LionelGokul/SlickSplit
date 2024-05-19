import { useEffect } from 'react';
import { Input, Button, Typography } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
import { useMaterialTailwindController, showAlert } from '@/context';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

export function SignUp() {
  let navigate = useNavigate();
  const [controller, dispatch] = useMaterialTailwindController();
  const { sendRequest, error } = useFetch();
  const onSubmit = async data => {
    data.preventDefault();

    try {
      const name = data.currentTarget[0].value;
      const email = data.currentTarget[1].value;
      const number = data.currentTarget[2].value;
      const password = data.currentTarget[3].value;

      await sendRequest(
        '/users/sign-up',
        'POST',
        JSON.stringify({ email, password, name, number }),
        {
          'Content-Type': 'application/json',
        }
      );

      showAlert(dispatch, {
        color: 'light-green',
        content: 'Registered successfully',
        icon: <CheckCircleIcon strokeWidth={2} className='h-6 w-6' />,
      });

      setTimeout(navigate('/auth/sign-in'), 2000);
    } catch (err) {
      showAlert(dispatch, {
        color: 'red',
        content: err.message,
        icon: <ExclamationCircleIcon strokeWidth={2} className='h-6 w-6' />,
      });
    }
  };

  return (
    <section className='m-8 flex'>
      <div className='w-2/5 h-full hidden lg:block'>
        <img
          src='/img/pattern.png'
          className='h-full w-full object-cover rounded-3xl'
        />
      </div>
      <div className='w-full lg:w-3/5 flex flex-col items-center justify-center'>
        <div className='text-center'>
          <Typography variant='h2' className='font-bold mb-4'>
            Register
          </Typography>
          <Typography
            variant='paragraph'
            color='blue-gray'
            className='text-lg font-normal'
          >
            Enter your details.
          </Typography>
        </div>
        <form
          className='mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2'
          onSubmit={onSubmit}
        >
          <div className='mb-1 flex flex-col gap-6'>
            <Typography
              variant='small'
              color='blue-gray'
              className='-mb-3 font-medium'
            >
              Your name
            </Typography>
            <Input
              size='lg'
              placeholder='John Doe'
              required
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
            />
          </div>
          <div className='mb-1 flex flex-col gap-6'>
            <Typography
              variant='small'
              color='blue-gray'
              className='-mb-3 font-medium'
            >
              Your email
            </Typography>
            <Input
              size='lg'
              type='email'
              required
              placeholder='name@mail.com'
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
            />
          </div>
          <div className='mb-1 flex flex-col gap-6'>
            <Typography
              variant='small'
              color='blue-gray'
              className='-mb-3 font-medium'
            >
              Your Number
            </Typography>
            <Input
              size='lg'
              placeholder='5622344405'
              required
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
            />
          </div>
          <div className='mb-1 flex flex-col gap-6'>
            <Typography
              variant='small'
              color='blue-gray'
              className='-mb-3 font-medium'
            >
              Your password
            </Typography>
            <Input
              size='lg'
              type='password'
              required
              placeholder='******'
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
            />
          </div>
          <Button className='mt-6' fullWidth type='submit'>
            Register Now
          </Button>
          <Typography
            variant='paragraph'
            className='text-center text-blue-gray-500 font-medium mt-4'
          >
            Already have an account?
            <Link to='/auth/sign-in' className='text-gray-900 ml-1'>
              Sign in
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
