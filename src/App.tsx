import { ChakraProvider } from "@chakra-ui/react";
import "styles/global.css";
import theme from "theme/theme";
import { BrowserRouter as Router } from "react-router-dom";
import { Libraries, LoadScript } from "@react-google-maps/api";
import RouterConfig from "router/routerPaths";
const libraries: Libraries = ["places"];


function App(): JSX.Element {
  return (
    <ChakraProvider theme={theme} >
      <LoadScript googleMapsApiKey='AIzaSyDPVTj_4pkQwV9t2ylExQpFixYFsFd55ac' libraries={libraries}  >
        <Router>
          <div className="App">
            <RouterConfig />
          </div>
        </Router>
      </LoadScript>
    </ChakraProvider>
  );
}

export default App;
