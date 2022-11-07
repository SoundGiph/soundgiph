import { ErrorMessage } from "@hookform/error-message";
import { UseFormReturn } from "react-hook-form";
import { CreateVozoForm, CreateVozoFormFields } from "../useCreateVozoForm.hook";

interface FormInputProps {
  form: UseFormReturn<CreateVozoForm>;
  name: CreateVozoFormFields;
  title: string;
  placeHolder: string;
}

export const FormInput: React.FC<FormInputProps> = ({ title, placeHolder, form, name }) => {
  return (
    <div className=" w-full max-w-xs mb-3 h-24">
      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold text-xl">{title}</span>
        </label>
        <input
          {...form.register(name, { required: "this is required" })}
          type="text"
          placeholder={placeHolder}
          className="input input-bordered input-primary w-full max-w-xs"
        />
      </div>
      <ErrorMessage
        errors={form.formState.errors}
        name={name}
        render={({ message }) => <p className="text-secondary text-xs text-left ml-1 mt-1 ">{message}</p>}
      />
    </div>
  );
};
