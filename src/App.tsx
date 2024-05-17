import { ChakraProvider } from "@chakra-ui/react";
import "styles/global.css";
import theme from "theme/theme";
import RouterConfig from "router/routerConfig";
import { BrowserRouter as Router } from "react-router-dom";


function App(): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <div className="App">
          <RouterConfig />
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
