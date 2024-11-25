import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="text-3xl">Hi welcome : {user.name}</h2>
    </div>
  );
};

export default UserHome;
