/* eslint-disable react/no-unused-state */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import ErrorAnimation from 'assets/lottie/error.json';
import Button from 'components/button';
import LottieContainer from 'core/LottieContainer';
import React from 'react';

type Props = {
    history: any;
};

type StateProps = {
    error: any | null;
    errorInfo: any | null
};

/* eslint-disable prettier/prettier */
class ErrorBoundary extends React.Component<Props, StateProps> {

    constructor(props: Props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }


    // This method is called if any error is encountered
    componentDidCatch(error: any, errorInfo: any) {

        // Catch errors in any components below and
        // re-render with error message
        this.setState({
            error,
            errorInfo
        });

    }

    // This will render this component wherever called
    render() {


        if (this.state.errorInfo)
            return (
                <div className='error__boundary'>

                    <LottieContainer json={ErrorAnimation} width={300} height={300} />
                    <Button className='text-white bg__primary' onClick={() => this.
                        props.history.push('/')}>Home</Button>

                </div >
            );


        return this.props.children;

    }
}

export default ErrorBoundary;
