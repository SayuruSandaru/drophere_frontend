import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        body: "Poppins, sans-serif",
        heading: "Poppins, sans-serif",
    },
    styles: {
        global: {
            "*:focus": {
                outline: "none !important", // Disables the outline globally, consider accessibility
                boxShadow: "none !important" // Removes any boxShadow on focus
            }
        }
    }
});

export default theme;
