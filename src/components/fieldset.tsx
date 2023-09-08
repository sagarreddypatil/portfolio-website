type Props = {
  title: string;
  children: React.ReactNode;
};

export default function Fieldset({ title, children }: Props) {
  return (
    <fieldset className=" border border-solid border-black dark:border-white min-w-0 p-4 pt-2">
      <legend>
        <span className="text-lg mx-2 font-mono italic">{title}</span>
      </legend>
      {children}
    </fieldset>
  );
}
