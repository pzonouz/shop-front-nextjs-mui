import MiniDrawer from "../components/Navigation/MiniDrawer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <MiniDrawer>{children}</MiniDrawer>
    </div>
  );
};
export default layout;
