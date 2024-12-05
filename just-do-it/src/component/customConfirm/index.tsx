import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (arg: any) => void;
  title: string;
  description: string;
}

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, description }: ConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button  variant="outline" onClick={onConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDialog