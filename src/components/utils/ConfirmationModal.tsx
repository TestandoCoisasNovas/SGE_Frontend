import { Modal } from "flowbite-react";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface ConfirmationModalInterface extends PropsWithChildren {
  showConfirmation: boolean;
  setShowConfirmation: Dispatch<SetStateAction<boolean>>;
}

export function ConfirmationModal({ showConfirmation, setShowConfirmation, children }: ConfirmationModalInterface) {
  return (
    <>
      <Modal show={showConfirmation} size="md" onClose={() => setShowConfirmation(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200 animate-pulse" />
            {children}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
