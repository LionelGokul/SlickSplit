import { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
} from '@material-tailwind/react';
import {
  useMaterialTailwindController,
  showDialogBox,
  showAddExpense,
} from '@/context';
import AddPeople from './components/addPeople';
import { useFetch } from '@/hooks/useFetch';

export function People() {
  const [controller, dispatch] = useMaterialTailwindController();
  const [people, setPeople] = useState();
  const [trigger, setTrigger] = useState(false);
  const { sendRequest } = useFetch();

  useEffect(() => {
    const getPeople = async () => {
      try {
        const userId = localStorage.getItem('uid');
        const response = await sendRequest(`/users/${userId}/people`, 'get');
        setPeople(response.people);
        localStorage.setItem('people', JSON.stringify(response.people));
      } catch (err) {
        console.log(err);
      }
    };
    getPeople();
  }, [trigger]);

  const openDialog = e => {
    e.preventDefault();
    showDialogBox(dispatch, {
      open: true,
      children: <AddPeople setTrigger={setTrigger} />,
    });
  };

  const openExpense = e => {
    e.preventDefault();
    showAddExpense(dispatch, { isOpen: true, setTrigger: setTrigger });
  };

  return (
    <div className='mt-12 mb-8 flex flex-col gap-12'>
      <Card>
        <CardHeader
          variant='gradient'
          color='gray'
          className='mb-4 grid h-28 place-items-center grid-cols-2'
        >
          <Button
            color='white'
            variant='gradient'
            className='flex items-center gap-3'
            ripple
            onClick={openDialog}
          >
            <i className='fa-solid fa-plus' />
            Add People
          </Button>
          <Button
            color='white'
            variant='gradient'
            className='flex items-center gap-3 ml-3'
            ripple
            onClick={openExpense}
          >
            <i className='fa-solid fa-plus' />
            Add Expense
          </Button>
        </CardHeader>

        <CardBody className='overflow-x-scroll px-0 pt-0 pb-2'>
          <table className='w-full min-w-[640px] table-auto'>
            <tbody>
              {people ? (
                people.length > 0 ? (
                  people.map(({ name, email, pictureURL, amountOwed }) => {
                    const className = 'py-3 px-5 border-b border-blue-gray-50';

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className='flex items-center gap-4'>
                            <Avatar
                              src={pictureURL}
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
                          {amountOwed < 0 ? (
                            <Chip
                              variant='gradient'
                              color='red'
                              value={`you owe ${amountOwed}`}
                              className='py-0.5 px-2 text-[11px] font-medium w-fit'
                            />
                          ) : amountOwed > 0 ? (
                            <Chip
                              variant='gradient'
                              color='green'
                              value={`owes you ${amountOwed}`}
                              className='py-0.5 px-2 text-[11px] font-medium w-fit'
                            />
                          ) : (
                            <Chip
                              variant='gradient'
                              color='gray'
                              value='you are all settled up'
                              className='py-0.5 px-2 text-[11px] font-medium w-fit'
                            />
                          )}
                        </td>
                        {/* <td className={className}>
                        <Typography
                          as='a'
                          href='#'
                          className='text-xs font-semibold text-blue-gray-600'
                        >
                          Add Expense
                        </Typography>
                      </td> */}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-semibold text-center'
                      >
                        You don't have any people added in your account.
                      </Typography>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-semibold text-center'
                    >
                      Loading...
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default People;
