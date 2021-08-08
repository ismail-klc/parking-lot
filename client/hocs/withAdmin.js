import Signin from "../pages/auth/signin";

const withAdmin = Component => {
    
    const Auth = (props) => {
        if (props.user && props.user.role === 'Admin') {
            return <Component {...props}/>;
        }

        return <Signin />
    };

    return Auth;
};

export default withAdmin;