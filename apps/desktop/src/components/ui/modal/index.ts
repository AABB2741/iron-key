import { Close, Root, Trigger } from "@radix-ui/react-dialog";

import { ModalContent } from "./content";
import { ModalDescription } from "./description";
import { ModalFooter } from "./footer";
import { ModalHeader } from "./header";
import { ModalOverlay } from "./overlay";
import { ModalTitle } from "./title";

export const Modal = {
  Root,
  Trigger,
  Header: ModalHeader,
  Footer: ModalFooter,
  Title: ModalTitle,
  Close,
  Description: ModalDescription,
  Content: ModalContent,
  Overlay: ModalOverlay,
};
