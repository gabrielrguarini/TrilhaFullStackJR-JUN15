type Props = {} & React.ComponentProps<"input">;
export const Input = (props: Props) => {
  return (
    <input
      {...props}
      className={`mt-4 rounded-full border-2 border-primary bg-transparent p-1 px-4 ${props.className}`}
    ></input>
  );
};
