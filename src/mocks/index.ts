import { handlers } from "./handlers";
import { setupWorker } from "msw";
import { canUseDOM } from "@chakra-ui/utils";
export const startWorker = async () => {
  if (process.env.NODE_ENV === "development" && canUseDOM()) {
    const worker = setupWorker(...handlers);
    await worker.start();
  }
};
