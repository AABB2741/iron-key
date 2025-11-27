import { Close, Description, Root, Trigger } from "@radix-ui/react-dialog";

import { ModalContent } from "./content";
import { ModalOverlay } from "./overlay";
import { ModalTitle } from "./title";

export const Modal = {
  Root,
  Trigger,
  Title: ModalTitle,
  Close,
  Description,
  Content: ModalContent,
  Overlay: ModalOverlay,
};
