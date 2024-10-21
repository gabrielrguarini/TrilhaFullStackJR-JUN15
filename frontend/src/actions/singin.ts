"use server";

export async function singin(formData: FormData) {
  const body = {
    email: formData.get("email"),
    password: formData.get("password"),
    repassword: formData.get("repassword"),
  };
  console.log("formData: ", body);
}
