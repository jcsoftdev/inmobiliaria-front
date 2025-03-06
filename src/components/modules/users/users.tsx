import { Button } from "@heroui/button";
import { routes } from "@router/routes";
import { useLocation, useNavigate } from "react-router";

import UsersList from "./users-list";

export const Users = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <div className="flex justify-between mt-10">
        <h2 className="text-2x1">Usuarios</h2>
        <Button
          color="primary"
          onPress={() =>
            navigate(routes.users.register, {
              state: { background: location },
            })
          }
          className=" mx-16"
        >
          Agregar
        </Button>
      </div>

      <UsersList />
    </div>
  );
};

export default Users
