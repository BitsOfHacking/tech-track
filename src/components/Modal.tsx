import React, { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  title: string;
  onClose: (...args: any[]) => any;
}

export default function Modal({ children, title, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div
        onClick={() => onClose()}
        className="fixed inset-0 bg-modal-veil opacity-40"
      ></div>
      <div className="course-shadow bg-modal-background rounded-[10px] z-10 px-6 py-4">
        <div className="ml-4 text-black text-[32px] font-normal">{title}</div>
        {children}
      </div>
    </div>
  )
}