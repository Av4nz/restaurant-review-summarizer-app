import { React } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingModal = ({ isOpen }) => {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-80 -translate-x-1/2 -translate-y-1/2 bg-slate-50 rounded-2xl p-6 shadow-lg flex flex-col gap-4 items-center">
          <Dialog.Title className="text-xl font-bold text-slate-950">
            Loading...
          </Dialog.Title>
          <Dialog.Description className=" text-slate-600 text-center">
            Please wait while we scrape and analyze the reviews.
            <div className="flex items-center justify-center my-4">
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            </div>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LoadingModal;
