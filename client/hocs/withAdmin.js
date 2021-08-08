import Signin from "../pages/auth/signin";

const withAdmin = Component => {
    const Auth = (props) => {
        if (props.user) {
            if (props.user.role === 'Admin') {
                return <Component {...props} />;
            }
            return <div className="text-center pt-5">
                You are not admin
            </div>
        }

        return <Signin />
    };

    return Auth;
};

export default withAdmin;