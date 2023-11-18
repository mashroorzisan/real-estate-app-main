import { useSelector} from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const {currentUser} = useSelector((state) => state.user);

    return currentUser ? <Outlet></Outlet> : <Navigate to='/signin'></Navigate>
};

export default PrivateRoute;