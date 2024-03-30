import '@walletconnect/react-native-compat'
import { WagmiConfig } from 'wagmi'
import { mainnet, polygon, arbitrum } from 'viem/chains'
import { createWeb3Modal, defaultWagmiConfig, Web3Modal, W3mButton } from '@web3modal/wagmi-react-native'
import { View,Text, StyleSheet } from 'react-native'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '218331fa4d1a3a8c30bfe055daf394df'

// 2. Create config
const metadata = {
  name: 'Web3Modal RN',
  description: 'Web3Modal RN Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com'
  }
}

const chains = [mainnet, polygon, arbitrum]

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

export default function WalletConnect() {
  return (
    <WagmiConfig config={wagmiConfig}>
        <View style={styles.container}>
            {/* <Text>Hello World</Text> */}
            <W3mButton/>
        </View>
      <Web3Modal />
    </WagmiConfig>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
})