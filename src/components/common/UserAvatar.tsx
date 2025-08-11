const UserAvatar = ({
  email,
  className,
}: {
  email: string;
  className?: string;
}) => {
  return (
    <span className="hover:bg-accent p-1 flex items-center justify-center rounded-full">
      <span
        className={`${className} bg-button-hover text-white flex items-center justify-center cursor-pointer rounded-full`}
      >
        {email?.slice(0, 2).toUpperCase()}
      </span>
    </span>
  );
};
export default UserAvatar;
