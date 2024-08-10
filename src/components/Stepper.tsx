import { BTN_STYLE } from '@/constants/common'
import type { TStep } from '@/types/common'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const primaryColor = 'hsl(204, 86%, 53%)'
const arrowBtnSize = 32

const Stepper = ({ steps }: { steps: TStep[] }) => {
  const { query, push, isReady } = useRouter()

  const currentStepParam = query.step
  const currentStepIndex = steps.findIndex((step: any) => `${step.id}` === currentStepParam)
  const currentStep = steps[currentStepIndex]

  useEffect(() => {
    if (!isReady) return
    if (!steps.find((step) => `${step.id}` === currentStepParam)) push(`?step=${steps[0].id}`)
  }, [currentStepParam, push, steps, isReady])

  const shouldDisable = (step: TStep) => {
    if (step.id === currentStep?.id) return true
    return currentStep?.disabledSteps?.includes(step.id)
  }

  const renderSteps = () =>
    steps.map((step) => {
      const disabled = shouldDisable(step)
      const isCurrentStep = step.id === currentStep?.id

      return (
        <button
          title={step.name}
          key={step.name}
          style={{
            ...BTN_STYLE,
            backgroundColor: step.id === currentStep?.id ? primaryColor : 'lightgray',
            color: step.id === currentStep?.id ? 'white' : 'black',
            opacity: disabled && !isCurrentStep ? 0.5 : 1,
            padding: '8px 16px',
            cursor: disabled && !isCurrentStep ? 'not-allowed' : 'pointer',
            borderRadius: 4,
          }}
          onClick={() => {
            if (currentStep?.validator && !currentStep.validator()) return

            currentStep?.onSubmit()
            push(`?step=${step.id}`)
          }}
          disabled={disabled}
        >
          {step.name}
        </button>
      )
    })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <div style={{ display: 'flex', gap: 24 }}>
        <button
          title="Previous step"
          disabled={currentStepIndex === 0}
          onClick={() => {
            if (currentStep?.validator && !currentStep.validator()) return
            push(`?step=${steps[currentStepIndex - 1].id}`)
          }}
          style={{ ...BTN_STYLE, cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={arrowBtnSize}
            height={arrowBtnSize}
            fill={currentStepIndex !== 0 ? primaryColor : 'currentColor'}
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
            />
          </svg>
        </button>

        {renderSteps()}

        <button
          title="Next step"
          style={BTN_STYLE}
          onClick={() => {
            if (currentStep?.validator && !currentStep.validator()) return

            currentStep?.onSubmit()
            if (currentStepIndex !== steps.length - 1) {
              push(`?step=${steps[currentStepIndex + 1].id}`)
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={arrowBtnSize}
            height={arrowBtnSize}
            fill={primaryColor}
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
            />
          </svg>
        </button>
      </div>

      {currentStep?.render()}
    </div>
  )
}

export default Stepper
