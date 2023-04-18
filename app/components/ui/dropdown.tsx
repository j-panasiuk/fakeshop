import { useId, type HTMLProps } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "~/utils/classes";

interface SelectProps<T extends string> extends HTMLProps<HTMLSelectElement> {
  options: T[];
}

export function Select<T extends string>({
  options,
  className,
  ...props
}: SelectProps<T>) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        Currency
      </label>
      <div className="group relative -ml-2 rounded-md border-transparent bg-gray-900 focus-within:ring-2 focus-within:ring-white">
        <select
          id={id}
          className={classNames(
            className,
            "flex items-center rounded-md border-transparent bg-gray-900 bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-white focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-100"
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
          <ChevronDownIcon
            className="h-5 w-5 text-gray-300"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
