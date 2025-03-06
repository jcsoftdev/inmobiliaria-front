import {
  addToast,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { routes } from "@router/routes";
import useAppStore from "@store/index";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { saveUser } from "@services/users";

type Inputs = {
  dni: string;
  name: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  expiresAt: string;
  password: string;
  agencyId: string;
};

const UserForm = () => {
  const {
    setUsersRegistration,
    users: { registration },
  } = useAppStore();
  const {
    isOpen,
    onOpen,
    onOpenChange,
    onClose: onCloseModal,
  } = useDisclosure();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: registration,
  });

  const handleChange = (key: keyof Inputs, value: string) => {
    setValue(key, value);
    setUsersRegistration({ [key]: value });
  };

  const onClose = () => {
    navigate(routes.users.home);
    onCloseModal();
  };

  const onSubmit = (props: Inputs) => {
    setUsersRegistration(props);
    saveUser({
      dni: props.dni,
      name: props.name,
      lastName: props.lastName,
      username: props.username,
      email: props.email,
      phone: props.phone,
      role: props.role,
      status: props.status,
      password: props.password,
      expiresAt: props.expiresAt,
      agencyId: props.agencyId,
    })
      .then(() => {
        addToast({
          color: "success",
          variant: "solid",
          title: "Usuario registrado",
          description: "El usuario ha sido registrado con éxito",
          hideCloseButton: true,
        });
        onClose();
      })
      .catch(() => {
        addToast({
          color: "danger",
          variant: "solid",
          title: "Error",
          description: "Hubo un error al registrar al usuario",
          hideCloseButton: true,
        });
      });
  };

  const onCancel = useCallback(() => {
    setUsersRegistration({
      dni: "",
      name: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      role: "",
      status: "",
      password: "",
      experiesAt: "",
      agencyId: "",
    });
  }, [setUsersRegistration]);

  useEffect(() => {
    onOpen();
    return () => {
      onCancel();
    };
  }, [onCancel, onOpen]);

  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      className="p-4"
    >
      <ModalContent>
        <ModalHeader>Agregar Usuario</ModalHeader>
        <form
          className="flex flex-col items-end"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-4 grid-cols-2 py-4 w-full">
            <Input
              label="DNI"
              {...register("dni", { required: true })}
              errorMessage={errors.dni ? "Campo requerido" : ""}
              isInvalid={!!errors.dni}
              onChange={(e) => handleChange("dni", e.target.value)}
            />
            <Input
              label="Nombre"
              {...register("name", { required: true })}
              errorMessage={errors.name ? "Campo requerido" : ""}
              isInvalid={!!errors.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <Input
              label="Apellido"
              {...register("lastName", { required: true })}
              errorMessage={errors.lastName ? "Campo requerido" : ""}
              isInvalid={!!errors.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
            <Input
              label="Usuario"
              {...register("username", { required: true })}
              errorMessage={errors.username ? "Campo requerido" : ""}
              isInvalid={!!errors.username}
              onChange={(e) => handleChange("username", e.target.value)}
            />
            <Input
              label="Email"
              {...register("email", { required: true })}
              errorMessage={errors.email ? "Campo requerido" : ""}
              isInvalid={!!errors.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <Input
              label="Contraseña"
              {...register("password", { required: true })}
              errorMessage={errors.password ? "Campo requerido" : ""}
              isInvalid={!!errors.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            <Input
              label="Teléfono"
              {...register("phone", { required: true })}
              errorMessage={errors.phone ? "Campo requerido" : ""}
              isInvalid={!!errors.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            <Input
              label="Rol"
              {...register("role", { required: true })}
              errorMessage={errors.role ? "Campo requerido" : ""}
              isInvalid={!!errors.role}
              onChange={(e) => handleChange("role", e.target.value)}
            />
            <Input
              label="Id de agencia"
              {...register("agencyId", { required: true })}
              errorMessage={errors.agencyId ? "Campo requerido" : ""}
              isInvalid={!!errors.agencyId}
              onChange={(e) => handleChange("agencyId", e.target
                .value)}
            />
            <Input
              label="Fecha de expiración"
              {...register("expiresAt", { required: true })}
              errorMessage={errors.expiresAt ? "Campo requerido" : ""}
              isInvalid={!!errors.expiresAt}
              onChange={(e) => handleChange("expiresAt", e.target.value)}
              type="date"
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button
              color="primary"
              variant="bordered"
              className="my-4 mt-10 min-w-48"
              onPress={() => {
                onClose();
              }}
              type="button"
            >
              Cancelar
            </Button>
            <Button
              color="primary"
              className="my-4 mt-10 min-w-48"
              type="submit"
            >
              Guardar
            </Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UserForm;
