import {
    FormControl,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputProps,
    InputRightElement,
    useDisclosure,
    useMergeRefs,
    FormErrorMessage,
} from '@chakra-ui/react';
import { forwardRef, useRef } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

interface PasswordFieldProps extends InputProps {
    isInvalid?: boolean;
    errorMessage?: string;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>((props, ref) => {
    const { isOpen, onToggle } = useDisclosure();
    const inputRef = useRef<HTMLInputElement>(null);

    const mergeRef = useMergeRefs(inputRef, ref);
    const onClickReveal = () => {
        onToggle();
        if (inputRef.current) {
            inputRef.current.focus({ preventScroll: true });
        }
    };

    const { isInvalid, errorMessage, ...rest } = props;

    return (
        <FormControl isInvalid={isInvalid}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
                <InputRightElement>
                    <IconButton
                        variant="text"
                        aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={onClickReveal}
                    />
                </InputRightElement>
                <Input
                    id="password"
                    ref={mergeRef}
                    name="password"
                    type={isOpen ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    {...rest}
                />
            </InputGroup>
            {isInvalid && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
        </FormControl>
    );
});

PasswordField.displayName = 'PasswordField';
