import { useState } from 'react';
import ReactSelect, { components } from 'react-select';
import { Typography } from '@material-tailwind/react';

const SelectComponent = ({
  options,
  isMulti,
  name,
  placeholder,
  label,
  id,
  isRequired,
}) => {
  const [values, setValues] = useState();
  const onChange = option => {
    setValues(option);
  };
  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
  };
  const formatGroupLabel = data => (
    <div style={groupStyles}>
      <i className={data.icon} style={{ marginRight: 10 }} />
      <span>{data.label}</span>
    </div>
  );
  return (
    <div className='mb-1 flex flex-col gap-6'>
      <Typography
        variant='small'
        color='blue-gray'
        className='-mb-3 font-medium'
      >
        {label}
      </Typography>
      <ReactSelect
        id={id}
        name={name}
        placeholder={placeholder}
        theme={theme => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary: 'black',
          },
        })}
        required={isRequired}
        value={values}
        options={options}
        onChange={onChange}
        isMulti={isMulti}
        formatGroupLabel={formatGroupLabel}
      />
    </div>
  );
};

export default SelectComponent;
