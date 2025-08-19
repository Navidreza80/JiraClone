import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-screen w-full items-center flex justify-center">
      <Loader className="animate-spin " />
    </div>
  );
};
export default Loading;
