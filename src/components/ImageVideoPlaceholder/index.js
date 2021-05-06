import ImagePicker from 'react-native-image-crop-picker';

export const handleImage = () => {

  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true
  }).then(image => {
    // console.log(image);
   return image;
  });
}