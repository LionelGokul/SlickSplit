import { Spinner } from '@material-tailwind/react';
import { useMaterialTailwindController } from '@/context';

const Loader = () => {
  const [controller] = useMaterialTailwindController();
  const { loading } = controller;
  return (
    <div className='loader flex items-end gap-8'>
      {loading && <Spinner className='h-12 w-12' />}
    </div>
  );
};

export default Loader;
