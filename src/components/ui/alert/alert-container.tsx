import { useState } from 'react'

import AlertComponent, { AlertComponentProps } from '@components/ui/alert/alert'
import { alert } from '@components/ui/alert/alert-main'

const AlertContainer = () => {
  const [alerts, setAlerts] = useState<AlertComponentProps[]>([])

  alert.register(setAlerts)

  return (
    <>
      {alerts.map((alertProps, index) => (
        <AlertComponent
          key={`alert-${index}`}
          {...alertProps}
          onClose={() => alert.dismiss(index)}
        />
      ))}
    </>
  )
}

export default AlertContainer
