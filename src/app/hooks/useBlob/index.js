const useFirebaseUpload = () => {

    var convertToBlob = async (uri, basePath = "") => {
        console.log("REACHED CONVERTtoBLOB");
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            let getExtArr = [...uri.split('.')];
            const fileName = `file_${new Date().getTime()}.${getExtArr[getExtArr.length - 1]}`;
            return Promise.resolve({
                blob,
                path: `${basePath}${fileName}`
            });
        } catch (error) {
            console.log("ERROR_WHILE_CONVERTING_BLOB - ", error);
            return Promise.reject(error);
        }
    }
 

    return {
        convertToBlob,
         }
}


export default useFirebaseUpload;