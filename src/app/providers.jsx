"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { http } from "viem";
import {
  flowTestnet
} from "viem/chains";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";

export function Providers({ children }) {
  const config = createConfig({
    chains: [flowTestnet],
    transports: {
      // [mainnet.id]: http(),
      [flowTestnet.id]: http(),
    },
  });
  const queryClient = new QueryClient();

  return (
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
        config={{
          // Customize Privy's appearance in your app
          appearance: {
            theme: "light",
            accentColor: "#ffae42",
            // logo: "https://your-logo-url",
          },
          // Create embedded wallets for users who don't have a wallet
          embeddedWallets: {
            createOnLogin: "users-without-wallets",
          },
        }}>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={config}>{children}</WagmiProvider>
        </QueryClientProvider>
      </PrivyProvider>
  );
}