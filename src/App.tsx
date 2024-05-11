import { ChakraProvider } from "@chakra-ui/react";
import theme from "definitions/chakra/theme";
import { RootStoreProvider } from "store";
import "styles/global.css";

import Home from "pages";

function App(): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <RootStoreProvider>
        <div className="App">
          <Home />
        </div>
      </RootStoreProvider>
    </ChakraProvider>
  );
}

export default App;
