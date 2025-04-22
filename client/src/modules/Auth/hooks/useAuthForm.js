import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import universalSchema from "../schemas/authSchema";

export default function useAuthForm({ formType, mode = "onBlur" }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(universalSchema(formType)),
    mode,
  });

  return { register, handleSubmit, reset, errors };
}