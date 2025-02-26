import { Property } from "@contracts/properties"
import { Chip } from "@heroui/chip"
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table"
import { getProperties } from "@services/properties"
import { useQuery } from "@tanstack/react-query"


const tableColumns = [
  {
    key: 'title',
    title: 'Nombre',
  },
  {
    key: 'description',
    title: 'Descripción',
  },
  {
    key: 'price',
    title: 'Precio',
  },
  {
    key: 'type',
    title: 'Tipo',
  },
  // {
  //   key: 'features',
  //   title: 'Características',
  // },
  {
    key: 'status',
    title: 'Estado',
  },
  // {
  //   key: 'created_at',
  //   title: 'Creado',
  // },
]

const statusMap = {
  active: <Chip color="success" >Activo</Chip>,
  reserved: <Chip color="warning">Reservado</Chip>,
  sold: <Chip color="danger">Vendido</Chip>,
  available: <Chip color="success">Disponible</Chip>,
}

const typeMap = {
  house: '🏠',
  apartment: '🏢',
  land: '🏞️',
  loft: '🏞️',
  commercial: '🏬',
  penthouse: '🏡',
}


const PropertiesList = () => {
  const {data: properties, error, isLoading} = useQuery<{
    data: Property[]
  }>({ queryKey: ['properties'], queryFn: async () => await getProperties() })

  if (isLoading) {
    return <p>Cargando...</p>
  }

  if (error) {
    return <p>Error:
      {error.message}
    </p>
  }

  console.log({properties, error, isLoading})

  return (
      <Table aria-label="Propiedades" className="pt-4">
          <TableHeader columns={tableColumns}>
            {
              (column) => {
                return (
                  <TableColumn key={column.key}>{column.title}</TableColumn>
                )
              }
            }
          </TableHeader>
          <TableBody items={properties?.data}>
            {
              (property) => {
                  console.log({property}, getKeyValue(property, 'title'))
                return (
                <TableRow key={property.id}>
                  {(columnKey) =>{

                    if (columnKey === 'status') {
                      return (
                        <TableCell key={columnKey} className="text-white" >
                          <span className="!text-white">{statusMap[(getKeyValue(property, columnKey) as string).toLowerCase() as keyof typeof statusMap]}</span>
                        </TableCell>
                      )
                    }

                    if (columnKey === 'type') {
                      return (
                        <TableCell key={columnKey}>
                          {typeMap[(getKeyValue(property, columnKey) as string).toLowerCase() as keyof typeof typeMap]}
                        </TableCell>
                      )
                    }

                    if (columnKey === 'price') {
                      return (
                        <TableCell key={columnKey}>
                          {`${getKeyValue(property, columnKey)}`.toString()?.split?.(',').map((price: string) => (
                            <Chip key={price} className="mr-2" variant='light' classNames={{content:'text-left p-0'}}>
                             S/ {price}
                            </Chip>
                          ))}
                        </TableCell>
                      )
                    }


                    return (
                      <TableCell key={columnKey}>{getKeyValue(property, columnKey)}</TableCell>
                    )
                  }}
                </TableRow>
              )}
            }
          </TableBody>
        </Table>
  )
}

export default PropertiesList
