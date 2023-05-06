import {Button, ButtonProps} from '@mantine/core';
import GoogleIcon from './GoogleIcon';
import FacebookIcon from './FacebookIcon';

export const GoogleButton = (props: ButtonProps) => {
    return <Button leftIcon={<GoogleIcon />} variant="default" color="gray" {...props} />;
}

export const FacebookButton = (props: ButtonProps) =>{
    return (
        <Button
            leftIcon={<FacebookIcon />}
            sx={(theme) => ({
                backgroundColor: '#4267B2',
                color: '#fff',
                '&:not([data-disabled]):hover': {
                    backgroundColor: theme.fn.darken('#4267B2', 0.1),
                },
            })}
            {...props}
        />
    );
}
