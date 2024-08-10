export type TStep = {
  id: number
  name: string
  render: () => JSX.Element
  onSubmit: () => void
  disabledSteps?: number[]
  validator?: () => boolean
}
