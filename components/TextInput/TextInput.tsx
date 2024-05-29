import { ComboBox } from "@mescius/wijmo.react.input";
import { ComboBox as ComboBoxType } from "@mescius/wijmo.input";
import { Controller } from "react-hook-form";
type Props = {
  control: any;
  name: string;
  errors: any;
  label: string;
  className?: string;
  inputType?: "text";
};
export default function TextInput({
  control,
  name,
  errors,
  label,
  className,
  inputType = "text",
}: Props) {
  return (
    <section className={className}>
      <div className="flex flex-col">
        <label htmlFor={name} className="font-medium">
          {label}
        </label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <ComboBox
              id={name}
              name={name}
              textChanged={(e: ComboBoxType) => field.onChange(e.text)}
              text={field.value}
              inputType={inputType}
            />
          )}
        />
        <div className="h-6 text-red-500">
          {errors[name] && <span role="alert">{errors[name].message}</span>}
        </div>
      </div>
    </section>
  );
}
