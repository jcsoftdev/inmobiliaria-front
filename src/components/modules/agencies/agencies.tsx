import { Button } from "@heroui/button";
import { useLocation, useNavigate } from "react-router";

import AgenciesList from "./agencies-list";

export const Agencies = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <div className="flex justify-between mt-10">
        <h2 className="text-2x1">Agencias</h2>
        <Button
          color="primary"
          onPress={() =>
            navigate("/agencia/register", {
              state: { background: location },
            })
          }
          className=" mx-16"
        >
          Agregar
        </Button>
      </div>

      <AgenciesList />
    </div>
  );
};

export default Agencies;