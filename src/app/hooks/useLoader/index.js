import React, {useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';


const useLoader = () => {
    const [loader, setLoader] = useState(true);

    const Loader = () => {
        return (
            <Spinner visible={loader} color={'#1FAEF7'} />
        );
    }
    return  [
        setLoader,
        Loader,
        loader
    ]
}

export default useLoader;