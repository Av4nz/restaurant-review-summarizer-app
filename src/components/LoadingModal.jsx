import { React, useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Progress from "@radix-ui/react-progress";

const LoadingModal = ({ isOpen, setIsOpen, onScrapingComplete }) => {
  const [scrapedCount, setScrapedCount] = useState(0);
  const totalReviews = 150;
  const [statusText, setStatusText] = useState(
    "Menyiapkan koneksi ke Google Maps..."
  );

  useEffect(() => {
    if (!isOpen) return;

    let count = 0;
    const statusSteps = [
      "Menghubungi server Google Maps...",
      "Mengambil halaman review...",
      "Mengurai konten review...",
      "Menyusun ringkasan...",
    ];

    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 5) + 1;
      setScrapedCount((prev) => (count >= totalReviews ? totalReviews : count));

      const stepIndex = Math.min(
        Math.floor((count / totalReviews) * statusSteps.length),
        statusSteps.length - 1
      );
      setStatusText(statusSteps[stepIndex]);

      if (count >= totalReviews) {
        clearInterval(interval);
        setIsOpen(false);
        if (onScrapingComplete) {
          onScrapingComplete();
        }
      }
      
    }, 500);

    return () => clearInterval(interval);
  }, [isOpen, setIsOpen, onScrapingComplete]);
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-lg flex flex-col gap-4 items-center">
          <h2 className="text-xl font-bold">Sedang Mengambil Review...</h2>
          <p className="text-sm text-gray-500">{statusText}</p>

          <Progress.Root className="relative overflow-hidden bg-gray-200 rounded-full w-full h-4">
            <Progress.Indicator
              className="bg-blue-600 h-full transition-all"
              style={{ width: `${(scrapedCount / totalReviews) * 100}%` }}
            />
          </Progress.Root>

          <div className="text-sm text-gray-500">
            {scrapedCount} dari {totalReviews} review berhasil diambil
          </div>

          <div className="text-xs text-gray-400">
            Estimasi: Mohon tunggu beberapa menit...
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LoadingModal;
