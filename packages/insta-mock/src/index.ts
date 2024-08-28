import { handlers } from "./handlers";
import { setupWorker } from "msw";
export const startWorker = async () => {
  const worker = setupWorker(...handlers);
  await worker.start();
};
