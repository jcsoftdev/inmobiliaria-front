import { Button } from "@heroui/button";
import { Pagination } from "@heroui/react";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { useAppStore } from "@store/index";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import Edit from "@components/icons/edit";
import Eye from "@components/icons/eye";
import Trash from "@components/icons/trash";
import { tableColumns } from "@components/modules/users/constants";
import { SkeletonTable } from "@components/skeletons/skeleton-table";

import { UsersResponse } from "@contracts/users.response";

import { getUsers } from "@services/users";

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<UsersResponse>({
    queryKey: ["users", currentPage],
    queryFn: async () => await getUsers({ perPage, page: currentPage }),
  });

  const { setUsers } = useAppStore();

  useEffect(() => {
    if (users) {
      setUsers({
        data: users.data,
        meta: users.meta,
        isLoading,
        isError: !!error,
      });
    }
  }, [users, setUsers, isLoading, error]);

  if (isLoading) {
    return <SkeletonTable columns={8} tableColumns={tableColumns} hasActions />;
  }

  if (error) {
    return (
      <p>
        Error:
        {error.message}
      </p>
    );
  }

  console.log({ users, error, isLoading });

  return (
    <div className="">
      <Table aria-label="Usuarios" className="pt-4">
        <TableHeader columns={tableColumns}>
          {(column) => {
            return <TableColumn key={column.key}>{column.title}</TableColumn>;
          }}
        </TableHeader>
        <TableBody items={users?.data}>
          {(user) => {
            return (
              <TableRow key={user.id}>
                {(columnKey) => {
                  if (columnKey === "actions") {
                    return (
                      <TableCell key={columnKey}>
                        <div className="flex gap-4">
                          <Button
                            color="primary"
                            className="text-white"
                            isIconOnly
                            onPress={() => {}}
                          >
                            <Eye />
                          </Button>
                          <Button
                            color="warning"
                            isIconOnly
                            className="text-white"
                          >
                            <Edit />
                          </Button>
                          <Button
                            color="danger"
                            isIconOnly
                            className="text-white"
                          >
                            <Trash />
                          </Button>
                        </div>
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell key={columnKey}>
                      <span>{getKeyValue(user, columnKey)}</span>
                    </TableCell>
                  );
                }}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
      <div className="py-4">
        <Pagination
          color="primary"
          page={currentPage}
          total={users?.meta.lastPage ?? 0}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default UsersList;
