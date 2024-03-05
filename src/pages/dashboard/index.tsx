import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Dashboard() {
  return (
    <div>
      <h1 style={{ color: "white" }}> Welcome to the Dashboard</h1>
    </div>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
