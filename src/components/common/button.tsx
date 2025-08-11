const AppButton = ({
  icon,
  className,
}: {
  icon?: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      className={`${className} bg-button flex gap-1 items-center text-white px-3 rounded text-sm font-semibold duration-200 transition-all hover:bg-button-hover cursor-pointer`}
    >
      {icon}
      Create
    </button>
  );
};
export default AppButton;
