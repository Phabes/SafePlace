import { UseFormHandleSubmit } from "react-hook-form";
import {
  CommonSignUpData,
  ShelterSignUpData,
  UserSignUpData,
} from "../../../types";

export const executePipeline = async (
  handlers: UseFormHandleSubmit<
    CommonSignUpData | ShelterSignUpData | UserSignUpData,
    undefined
  >[]
): Promise<any> => {
  const results = { success: true };
  for (const handler of handlers) {
    const result = await new Promise((resolve, reject) => {
      handler(
        (data: object) => {
          resolve(data);
        },
        (error: unknown) => {
          resolve({ success: false });
        }
      )();
    });
    Object.assign(results, result);
  }

  return results;
};
