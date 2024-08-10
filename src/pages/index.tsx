import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Stepper from '@/components/Stepper'
import { type CSSProperties, useState } from 'react'
import type { TStep } from '@/types/common'
import { BTN_STYLE } from '@/constants/common'

const inter = Inter({ subsets: ['latin'] })
const calculateButtonStyle: CSSProperties = {
  height: 24,
  width: 24,
  textAlign: 'center',
  border: '1px solid white',
  borderRadius: 24,
}

export default function Home() {
  const [step1State, setStep1State] = useState(1)
  const [step2State, setStep2State] = useState('')

  const steps: TStep[] = [
    {
      id: 1,
      name: 'Step 1',
      render: () => (
        <div style={{ display: 'flex', gap: 16 }}>
          <button
            style={{ ...BTN_STYLE, ...calculateButtonStyle }}
            onClick={() => setStep1State((pre) => (pre = pre - 1))}
          >
            -
          </button>
          <div>{step1State}</div>
          <button
            style={{ ...BTN_STYLE, ...calculateButtonStyle }}
            onClick={() => setStep1State((pre) => (pre = pre + 1))}
          >
            +
          </button>
        </div>
      ),
      onSubmit: () => console.log('Submitted step 1'),
      disabledSteps: [3],
    },
    {
      id: 2,
      name: 'Step 2',
      render: () => (
        <div>
          <label htmlFor="greeting">Greeting: </label>
          <input
            type="text"
            id="greeting"
            name="greeting"
            value={step2State}
            onChange={(ev) => setStep2State(ev.currentTarget.value)}
          />
        </div>
      ),
      onSubmit: () => console.log('Submitted step 2'),
      validator: () => {
        if (step2State.length > 1) return true

        alert('Greeting must be 2 or more characters')
        return false
      },
    },
    {
      id: 3,
      name: 'Step 3',
      render: () => (
        <div>
          <h1>Review</h1>
          <br />
          <h2>Step 1</h2>
          <p>{step1State}</p>
          <br />
          <h2>Step 2</h2>
          <p>{step2State}</p>
        </div>
      ),
      onSubmit: () => console.log('Submitted step 3'),
    },
  ]

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${inter.className}`}>
        <Stepper steps={steps} />
      </main>
    </>
  )
}
