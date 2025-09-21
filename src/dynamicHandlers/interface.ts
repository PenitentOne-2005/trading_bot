import { CallbackProps } from "@/exports.js";

export interface DynamicHandlers {
  [key: string]: (data: string, props: CallbackProps) => Promise<void>;
}
