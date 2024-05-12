import { ChakraProvider } from "@chakra-ui/react";
import { RootStoreProvider } from "store";
import "styles/global.css";
import theme from "theme/theme";
import Home from "pages";
import RouterConfig from "router/routerConfig";
import { BrowserRouter as Router } from "react-router-dom";


function App(): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <RootStoreProvider>
        <Router>
          <div className="App">
            <RouterConfig />
          </div>
        </Router>
      </RootStoreProvider>
    </ChakraProvider>
  );
}

export default App;
