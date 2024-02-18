export async function saveImage(image: File) {
  const imageToBase64 = covertToBase64(image);
}

function covertToBase64(file: File) {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
    console.log(reader.result);
    const base64 = reader.result;
    return base64;
  };
  reader.onerror = (error) => {
    console.error(error);
    return "error";
  };
}
