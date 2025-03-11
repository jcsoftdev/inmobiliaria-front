import { AlertComponentProps } from './alert'

export class Alert {
  private setAlerts: React.Dispatch<
    React.SetStateAction<AlertComponentProps[]>
  > | null = null

  register(
    setAlerts: React.Dispatch<React.SetStateAction<AlertComponentProps[]>>
  ) {
    this.setAlerts = setAlerts
  }

  fire(props: AlertComponentProps) {
    if (this.setAlerts) {
      this.setAlerts((prev) => [...prev, props]) // Add new alert to the array
    } else {
      console.warn('AlertContainer is not mounted yet.')
    }
  }

  dismiss(index: number) {
    if (this.setAlerts) {
      this.setAlerts((prev) => prev.filter((_, i) => i !== index))
    }
  }
}

export const alert = new Alert()
