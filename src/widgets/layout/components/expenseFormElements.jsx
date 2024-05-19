import { useEffect, useState } from 'react';
import { Typography, Input, Textarea } from '@material-tailwind/react';
import SelectComponent from '@/widgets/formElements/select';
import { useFetch } from '@/hooks/useFetch';
import DateInputElement from '@/widgets/formElements/dataPicker';

const ExpenseFormElements = () => {
  const [people, setPeople] = useState();
  const { sendRequest } = useFetch();

  const categoryOptions = [
    {
      label: 'Uncategorized',
      icon: 'fas fa-question-circle',
      options: [
        {
          value: 'General',
          label: 'General',
          icon: 'fas fa-question-circle',
        },
      ],
    },
    {
      label: 'Entertainment',
      icon: 'fas fa-film',
      options: [
        {
          value: 'Games',
          label: 'Games',
          icon: 'fas fa-gamepad',
        },
        {
          value: 'Movies',
          label: 'Movies',
          icon: 'fas fa-film',
        },
        {
          value: 'Sports',
          label: 'Sports',
          icon: 'fas fa-football-ball',
        },
        {
          value: 'Music',
          label: 'Music',
          icon: 'fas fa-music',
        },
      ],
    },
    {
      label: 'Food and Drink',
      icon: 'fas fa-utensils',
      options: [
        {
          value: 'Food and Drinks',
          label: 'Food and Drinks',
          icon: 'fas fa-utensils',
        },
        {
          value: 'Dining Out',
          label: 'Dining Out',
          icon: 'fas fa-concierge-bell',
        },
        {
          value: 'Groceries',
          label: 'Groceries',
          icon: 'fas fa-shopping-basket',
        },
        {
          value: 'Liquor',
          label: 'Liquor',
          icon: 'fas fa-wine-bottle',
        },
      ],
    },
    {
      label: 'Home',
      icon: 'fas fa-home',
      options: [
        {
          value: 'Home',
          label: 'Home',
          icon: 'fas fa-home',
        },
        {
          value: 'Electronics',
          label: 'Electronics',
          icon: 'fas fa-tv',
        },
        {
          value: 'Rent',
          label: 'Rent',
          icon: 'fas fa-file-invoice-dollar',
        },
        {
          value: 'Services',
          label: 'Services',
          icon: 'fas fa-concierge-bell',
        },
      ],
    },
    {
      label: 'Utilities',
      icon: 'fas fa-tools',
      options: [
        {
          value: 'Electricity',
          label: 'Electricity',
          icon: 'fas fa-bolt',
        },
        {
          value: 'Gas',
          label: 'Gas',
          icon: 'fas fa-gas-pump',
        },
        {
          value: 'WiFi',
          label: 'WiFi',
          icon: 'fas fa-wifi',
        },
      ],
    },
  ];

  const formatPeopleOptions = data => {
    let options = [];
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    if (data.length > 0) {
      options = data.map(people => {
        return { value: people.id, label: people.name };
      });
      options = [
        ...options,
        { value: localStorage.getItem('uid'), label: userDetails.name },
      ];
    } else {
      options = [{ value: null, label: 'No people found' }];
    }

    return options;
  };

  useEffect(() => {
    const getPeople = async () => {
      try {
        const userId = localStorage.getItem('uid');
        const response = await sendRequest(`/users/${userId}/people`, 'get');
        const options = formatPeopleOptions(response.people);
        setPeople(options);
        localStorage.setItem('people', JSON.stringify(response.people));
      } catch (err) {
        console.log(err);
      }
    };
    const peopleData = JSON.parse(localStorage.getItem('people'));

    if (peopleData) {
      const options = formatPeopleOptions(peopleData);
      setPeople(options);
    } else {
      getPeople();
    }
  }, []);

  return (
    <div className='mb-12'>
      {people && (
        <div className='my-8 flex flex-col gap-4'>
          <div className='mb-1 flex flex-col gap-6'>
            <Typography
              variant='small'
              color='blue-gray'
              className='-mb-3 font-medium'
            >
              Expense name
            </Typography>
            <Input
              size='lg'
              name='name'
              id='name'
              placeholder='Cab'
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
              Expense amount ($)
            </Typography>
            <Input
              size='lg'
              type='number'
              name='amount'
              id='amount'
              min={1}
              required
              placeholder='1'
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
            />
          </div>
          <div className='mb-1 flex flex-col gap-6'>
            <DateInputElement
              id='date'
              name='date'
              label='Expense Date'
              isRequired={true}
            />
          </div>
          <div className='mb-1 flex flex-col gap-6'>
            <SelectComponent
              options={categoryOptions}
              isMulti={false}
              id='category'
              name='category'
              label='Category'
              placeholder='Rent'
              isRequired={true}
            />
          </div>
          <div className='mb-1 flex flex-col gap-6'>
            <SelectComponent
              options={people}
              isMulti={false}
              id='paidBy'
              name='paidBy'
              label='Paid By'
              placeholder='John'
              isRequired={true}
            />
          </div>
          <div className='mb-1 flex flex-col gap-6'>
            <SelectComponent
              options={people}
              isMulti={true}
              id='sharedBy'
              name='sharedBy'
              label='Shared By'
              placeholder='John'
              isRequired={true}
            />
          </div>
          <div className='mb-1 flex flex-col gap-6'>
            <Textarea label='Description' id='description' name='description' />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseFormElements;
