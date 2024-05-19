import React from 'react';
import { Alert } from '@material-tailwind/react';
import { useMaterialTailwindController, showAlert } from '@/context';

export function AlertMessage() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { alert } = controller;

  return (
    <>
      <div className='mx-auto my-20 flex max-w-screen-lg flex-col gap-8 alert-container'>
        <Alert
          key={alert.color}
          open={alert.color ? true : false}
          color={alert.color}
          icon={alert.icon}
          onClose={() => {
            showAlert(dispatch, {});
          }}
          animate={{
            mount: { x: 0 },
            unmount: { x: 100 },
          }}
        >
          {alert.content || ''}
        </Alert>
      </div>
    </>
  );
}

export default AlertMessage;
