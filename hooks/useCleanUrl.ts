import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export const useCleanUrl = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const clearUrl = useCallback(() => {
    router.back();
  }, [router]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        clearUrl();
        setIsOpen(false);
      }
    },
    [clearUrl],
  );

  return {
    isOpen,
    handleOpenChange,
  };
};
