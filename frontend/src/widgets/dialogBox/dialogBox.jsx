import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { useMaterialTailwindController, showDialogBox } from '@/context';

export function DialogBox() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { dialogBox } = controller;

  return (
    <Dialog
      open={dialogBox.open || false}
      handler={e => {
        e.preventDefault();
        showDialogBox(dispatch, { children: <></>, open: !dialogBox.open });
      }}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      {dialogBox.children}
      {/* {dialogBox.header && <DialogHeader>{dialogBox.header}</DialogHeader>}
      {dialogBox.body && <DialogBody>{dialogBox.body}</DialogBody>}
      <DialogFooter>
        <Button
          variant='ext'
          color='redt'
          onClick={e => {
            e.preventDefault();
            showDialogBox(dispatch, {
              ...dialogBox,
              open: !dialogBox.open,
            });
          }}
          className='mr-1'
        >
          <span>Cancel</span>
        </Button>
      </DialogFooter> */}
    </Dialog>
  );
}
