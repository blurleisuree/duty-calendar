import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function useAuthForm({ formType, mode = "onBlur", universalSchema }) {
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