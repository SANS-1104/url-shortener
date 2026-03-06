import { Toaster as Sonner } from "sonner";

const Toaster = (props) => {
  return (
    <Sonner
      theme="light"   // or "dark"
      className="toaster group"
      {...props}
    />
  );
};

export { Toaster };