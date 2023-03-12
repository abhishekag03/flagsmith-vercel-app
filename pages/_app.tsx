import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FlagsmithProvider } from "flagsmith/react";
import flagsmith from "flagsmith/isomorphic";

function App({
  Component,
  pageProps,
  flagsmithState,
}: AppProps & { flagsmithState: any }) {
  return (
    <FlagsmithProvider flagsmith={flagsmith} serverState={flagsmithState}>
      <Component {...pageProps} />
    </FlagsmithProvider>
  );
}

App.getInitialProps = async () => {
  await flagsmith.init({
    // fetches flags on the server
    environmentID: "heiEFz5x78igSLA8fGRgiP", // substitute your env ID
  });
  return { flagsmithState: flagsmith.getState() };
};

export default App;
