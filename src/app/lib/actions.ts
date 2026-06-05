"use server";

import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  fax: Yup.boolean().oneOf([false], "Bot detected"), // Honeypot checkbox must be false
});

export type SignUpActionState = {
  message?: string;
};

export async function signupNewsletter(
  _prevState: SignUpActionState,
  formData: FormData
): Promise<SignUpActionState> {
  const email = formData.get("email") as string;
  const fax = formData.get("fax") as string; // Checkbox returns "1" if checked, null if unchecked
  const webhookUrl = process.env.PIPEDREAM_NEWSLETTER_WORKFLOW_URL || "";

  // Check for bot activity (honeypot checkbox checked)
  if (fax === "1") {
    console.log("Bot detected - honeypot checkbox checked:", {
      email,
      fax,
      timestamp: new Date().toISOString(),
      userAgent: formData.get("userAgent") || "unknown",
    });

    // Return success message to not reveal the honeypot to bots
    return {
      message: "Success! You are now on the list",
    };
  }

  // Convert fax to boolean for validation - handle null case
  const faxBoolean = fax === "1" ? true : false;

  const validatedFields = await SignupSchema.validate({
    email,
    fax: faxBoolean,
  }).catch((err) => {
    console.log("Validation error", err);
    return null;
  });

  if (!validatedFields) {
    return {
      message: "Invalid input",
    };
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append(
    "Authorization",
    "Bearer " + process.env.PIPEDREAM_BEARER_TOKEN || ""
  );

  const body = {
    email: email,
  };

  const options: RequestInit = {
    method: "POST",
    headers,
    mode: "cors" as RequestMode,
    body: JSON.stringify(body),
  };

  let resultMessage: SignUpActionState = {
    message: "An error occurred, please try again later", // Default error message
  };

  try {
    const response = await fetch(webhookUrl, options);

    if (response.status === 200) {
      resultMessage = {
        message: "Success! You are now on the list",
      };
    }
  } catch (error) {
    console.error("Fetch error", error);
  }

  return resultMessage;
}
