import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type ModalProps = {
  title: string;
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'lg' | 'xl'; // Tamaños posibles del modal
};

const ModalData: React.FC<ModalProps> = ({ title, show, onClose, children, size }) => {
  return (
    <Modal show={show} onHide={onClose} size={size}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalData;