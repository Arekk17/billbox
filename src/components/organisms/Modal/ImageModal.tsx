"use client";

import { useState } from "react";
import { Modal } from "@/components/molecules/Modal/Modal";
import Image from "next/image";
import { FaImage } from "react-icons/fa";

interface ImageModalProps {
  imageUrl: string;
}

export const ImageModal = ({ imageUrl }: ImageModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="btn btn-ghost btn-sm">
        <FaImage className="h-4 w-4" />
        <span className="ml-2">Zobacz zdjęcie</span>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Zdjęcie paragonu"
        primaryButton={{
          text: "Zamknij",
          onClick: () => setIsOpen(false),
        }}
      >
        <div className="flex justify-center">
          <Image
            src={imageUrl}
            alt="Zdjęcie paragonu"
            width={800}
            height={600}
            className="max-w-full max-h-[70vh] object-contain"
          />
        </div>
      </Modal>
    </>
  );
};
