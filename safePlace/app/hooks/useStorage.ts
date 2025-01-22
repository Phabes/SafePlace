
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
export const uploadImage = async (uri:string) =>{
  const blob: Blob | Uint8Array | ArrayBuffer = await new Promise((resolve,reject)=>{
    const xhr = new XMLHttpRequest();
    xhr.onload = ()=>{
      resolve(xhr.response);
    }
    xhr.onerror = (e)=>{
      console.log(e);
      reject(new TypeError("Network request failed"));
    }
    xhr.responseType = "blob";
    xhr.open("GET",uri,true);
    xhr.send(null);
  })

  const fileName = uri.substring(uri.lastIndexOf('/')+1)
  const fileRef = ref(getStorage(),fileName)
  const result = await uploadBytes(fileRef, blob);

  return await getDownloadURL(fileRef);
}
