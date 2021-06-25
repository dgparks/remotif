import { useContext } from 'react';
import FirebaseContext from '../contexts/FirebaseContext';


//-----------------------|| AUTH HOOKS ||-----------------------//

const useAuth = () => useContext(FirebaseContext);

export default useAuth;
