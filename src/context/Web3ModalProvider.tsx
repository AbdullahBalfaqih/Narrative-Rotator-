'use client'

import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { mainnet, sepolia, type AppKitNetwork } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { coinbaseWallet } from 'wagmi/connectors'

const queryClient = new QueryClient()

// Dummy Project ID for testing. The user should replace this in production.
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'b56e18d47c72ab683b10817156fbcb59'

const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, sepolia];

export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  networks,
  projectId,
  connectors: [
    coinbaseWallet({
      appName: 'Daylight Dashboard',
      preference: {
        options: 'all',
        telemetry: false
      }
    })
  ]
})

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'Daylight Dashboard',
    description: 'Daylight AppKit Integration',
    url: 'https://daylight.com',
    icons: ['https://avatars.githubusercontent.com/u/179229932']
  },
  themeMode: 'dark',
  features: {
    analytics: false
  }
})

export default function Web3ModalProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
