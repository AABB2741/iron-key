import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { LengthField } from "./length-field";
import { SwitchField } from "./switch-field";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm: usePasswordForm } = createFormHook({
  fieldComponents: {
    LengthField,
    SwitchField,
  },
  fieldContext,
  formComponents: {},
  formContext,
});
