import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
} from '@material-tailwind/react';
import { authorsTableData } from '@/data';

export function Expenses() {
  return (
    <div className='mt-12 mb-8 flex flex-col gap-12'>
      <Card>
        <CardHeader
          variant='gradient'
          color='gray'
          className='mb-4 grid h-28 place-items-center'
        >
          <Button
            color='white'
            variant='gradient'
            className='flex items-center gap-3'
            ripple
          >
            <i className='fa-solid fa-plus' />
            Add Expense
          </Button>
        </CardHeader>

        <CardBody className='overflow-x-scroll px-0 pt-0 pb-2'>
          <table className='w-full min-w-[640px] table-auto'>
            <tbody>
              {authorsTableData.map(({ img, name, email, money }, key) => {
                const className = `py-3 px-5 ${
                  key === authorsTableData.length - 1
                    ? ''
                    : 'border-b border-blue-gray-50'
                }`;

                return (
                  <tr key={name}>
                    <td className={className}>
                      <div className='flex items-center gap-4'>
                        <Avatar
                          src={img}
                          alt={name}
                          size='sm'
                          variant='rounded'
                        />
                        <div>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-semibold'
                          >
                            {name}
                          </Typography>
                          <Typography className='text-xs font-normal text-blue-gray-500'>
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Chip
                        variant='gradient'
                        color={money > 0 ? 'green' : 'red'}
                        value={
                          money > 0 ? `owes you ${money}` : `you owe ${money}`
                        }
                        className='py-0.5 px-2 text-[11px] font-medium w-fit'
                      />
                    </td>
                    <td className={className}>
                      <Typography
                        as='a'
                        href='#'
                        className='text-xs font-semibold text-blue-gray-600'
                      >
                        Add Expense
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Expenses;
