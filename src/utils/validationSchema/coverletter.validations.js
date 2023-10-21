import * as Yup from "yup";

export const coverLetterValidationSchema = Yup.object().shape({
  addy: Yup.string().required("Please Input Wallet Address"),
});
