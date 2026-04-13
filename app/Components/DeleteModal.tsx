"use client";

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export default function DeleteModal({ isOpen, onClose, onConfirm, title, description }: DeleteModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay - gör bakgrunden mörkare */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-azure-11/40 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-card bg-white p-6 shadow-xl transition-all border border-grey-91">
                
                {/* Stäng-kryss i hörnet */}
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 text-azure-65 hover:text-azure-11 transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                  {/* Ikon-cirkel */}
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-60 mb-4">
                    <Trash2 size={32} />
                  </div>

                  <Dialog.Title as="h3" className="text-xl font-bold text-azure-11 mb-2">
                    {title}
                  </Dialog.Title>
                  
                  <p className="text-azure-34 mb-8 leading-relaxed">
                    {description}
                  </p>

                  {/* Knappar */}
                  <div className="flex w-full gap-3">
                    <button
                      type="button"
                      className="btn-secondary flex-1 justify-center"
                      onClick={onClose}
                    >
                      Avbryt
                    </button>
                    <button
                      type="button"
                      className="btn-delete flex-1 py-3 font-semibold"
                      onClick={() => {
                        onConfirm();
                        onClose();
                      }}
                    >
                      Ja, radera
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}