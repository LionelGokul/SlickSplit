import { Input, Button, Typography } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import {
  useMaterialTailwindController,
  showAlert,
  setLoginData,
} from '@/context';

export function SignIn() {
  const { sendRequest } = useFetch();
  const [controller, dispatch] = useMaterialTailwindController();
  const navigate = useNavigate();

  const signIn = async data => {
    data.preventDefault();
    try {
      const email = data.currentTarget[0].value;
      const password = data.currentTarget[1].value;
      const response = await sendRequest(
        '/users/login',
        'POST',
        JSON.stringify({ email, password }),
        {
          'Content-Type': 'application/json',
        }
      );

      localStorage.setItem(
        'userDetails',
        JSON.stringify({
          name: response.name,
          email: response.email,
        })
      );

      localStorage.setItem('uid', response.userId);
      localStorage.setItem('token', response.token);

      setLoginData(dispatch, {
        id: response.userId,
        token: response.token,
        name: response.name,
        email: response.email,
      });

      showAlert(dispatch, {
        color: 'light-green',
        content: 'Logged in successfully',
        icon: <CheckCircleIcon strokeWidth={2} className='h-6 w-6' />,
      });

      navigate('/dashboard/people');
    } catch (err) {
      showAlert(dispatch, {
        color: 'red',
        content: err.message,
        icon: <ExclamationCircleIcon strokeWidth={2} className='h-6 w-6' />,
      });
    }
  };

  return (
    <section className='m-8 flex gap-4'>
      <div className='w-full lg:w-3/5 mt-24'>
        <div className='text-center'>
          <Typography variant='h2' className='font-bold mb-4'>
            Sign In
          </Typography>
          <Typography
            variant='paragraph'
            color='blue-gray'
            className='text-lg font-normal'
          >
            Enter your email and password to Sign In.
          </Typography>
        </div>
        <form
          className='mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2'
          onSubmit={signIn}
        >
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
              placeholder='name@mail.com'
              required
              type='email'
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
            />
            <Typography
              variant='small'
              color='blue-gray'
              className='-mb-3 font-medium'
            >
              Password
            </Typography>
            <Input
              type='password'
              size='lg'
              required
              placeholder='********'
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
            />
          </div>
          <Button type='submit' className='mt-6' fullWidth>
            Sign In
          </Button>

          <div className='flex items-center justify-between gap-2 mt-6'>
            <Typography variant='small' className='font-medium text-gray-900'>
              <a href='#'>Forgot Password</a>
            </Typography>
          </div>
          <Typography
            variant='paragraph'
            className='text-center text-blue-gray-500 font-medium mt-4'
          >
            Not registered?
            <Link to='/auth/sign-up' className='text-gray-900 ml-1'>
              Create account
            </Link>
          </Typography>
        </form>
      </div>
      <div className='w-2/5 h-full hidden lg:block'>
        <img
          src='/img/pattern.png'
          className='h-full w-full object-cover rounded-3xl'
        />
      </div>
    </section>
  );
}

export default SignIn;
