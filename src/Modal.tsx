import React, { FC } from 'react';
import CloseButton from './CloseButton';

type ModalProps = {
    show: boolean;
    onClose: () => void;
}

const Modal: FC<ModalProps> = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-modalBG rounded-lg shadow-lg max-w-[60vw] w-full" onClick={e => {
          e.stopPropagation()
          onClose()
        }}>
        <div className='bg-modalHeader modal-header flex p-3 flex-col gap-y-1'>
            <div className='modal-header-title flex justify-between items-center'>
                <span className="text-white text-xl">Create Tag and Query</span>
                <div onClick={e => onClose()} style={{cursor: 'pointer'}}>
                  <CloseButton />
                </div>
            </div>
            <div className='modal-header-query text-left'>
                <span style={{color: '#A5B4FC'}}>The query you build will be saved in your active view</span>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default Modal;