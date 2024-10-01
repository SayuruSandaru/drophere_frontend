import { useToast } from "@chakra-ui/react";
export const useShowWarningToast = () => {
    const toast = useToast();
    return (message: string) => {
        toast({
            title: message,
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top",
        });
    };
};


export const useShowErrorToast = () => {
    const toast = useToast();
    return (message: string) => {
        toast({
            title: "Error",
            description: message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
        });
    };
};

export const useShowSuccessToast = () => {
    const toast = useToast();
    return (message: string) => {
        toast({
            title: "Success",
            description: message,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
        });
    };
};
