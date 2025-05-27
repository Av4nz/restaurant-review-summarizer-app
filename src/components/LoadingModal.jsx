import { React } from "react";
import * as Dialog from "@radix-ui/react-dialog";

const LoadingModal = ({ isOpen }) => {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-80 -translate-x-1/2 -translate-y-1/2 bg-slate-50 rounded-2xl p-6 shadow-lg flex flex-col gap-4 items-center">
          <Dialog.Title className="text-lg font-bold text-slate-950">
            Loading...
          </Dialog.Title>
          <Dialog.Description className="text-sm text-slate-500 text-center">
            Please wait while we scrape and analyze the reviews.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LoadingModal;
