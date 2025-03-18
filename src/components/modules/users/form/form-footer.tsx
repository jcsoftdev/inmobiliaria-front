import { Button } from '@heroui/button'

import { FormFooterProps, FormType } from '@components/modules/users/types'

export const FormUsersFooter = ({ onClose, type }: FormFooterProps) => {
  return (
    <div className="flex justify-end gap-4">
      <Button
        color="primary"
        variant="bordered"
        className="px-10"
        onPress={onClose}
        type="button"
      >
        Cancelar
      </Button>
      <Button color="primary" className="px-10" type="submit">
        {type === FormType.ADD ? 'Guardar' : 'Editar'}
      </Button>
    </div>
  )
}
