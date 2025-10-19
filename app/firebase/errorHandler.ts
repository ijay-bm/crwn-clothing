import { FirebaseError } from "firebase/app";

import { errorMap } from "./errorMap";

/**
 * TODO TBD: REDO to something better later
 */
export function errorHandler(error: unknown) {
  if (error instanceof FirebaseError) {
    const message = errorMap[error.code] || "An unknown error occurred";
    alert(message);
  } else {
    console.log("unknown error", error);
    alert("Something went wrong. Please try again later.");
  }
}
