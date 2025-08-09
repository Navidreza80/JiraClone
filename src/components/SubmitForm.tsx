import { SyncLoader } from "react-spinners";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

const SubmitForm = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      aria-disabled={pending}
      type="submit"
      className="w-full bg-button hover:bg-button/80 cursor-pointer"
    >
      {pending ? <SyncLoader size={5} color="white" /> : "Login"}
    </Button>
  );
};
export default SubmitForm;
