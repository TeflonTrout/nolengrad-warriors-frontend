import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../redux/store';
import Head from 'next/head';

// COMPONENTS
import Navbar from '../components/NavBar/Navbar';
import Footer from '../components/Footer/Footer';
import MintingModal from '../components/MintingModal/MintingModal';

// RAINBOW KIT
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';

const { chains, provider } = configureChains(
  [chain.goerli],
  [
    alchemyProvider({ apiKey: "JiP15wSbmnk41hjUJex6H0XdVDp1Rp9B" }),
    publicProvider(),
  ]
)
const { connectors } = getDefaultWallets({
  appName: 'Battle for Icy Fjord',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
    <div className="App">
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
            <div style={{
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: "column", 
                justifyContent: 'space-between', 
                alignItems: 'center'}}>
              <Head>
                <title>NGW</title>
                <meta name="description" content="Verified Random NFT Project!" />
                <link rel="icon" href="/favicon.ico" />
              </Head>
              <Navbar />              
              <Component {...pageProps} />
              <MintingModal />
              <Footer />
            </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
    </Provider>
  );
}

export default App;
