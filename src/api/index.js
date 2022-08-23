// get mock file data
export const getMockFile = () =>
  fetch(`${process.env.PUBLIC_URL}/data/file.json`)
    .then(response => response.json())
    .catch(function (error) {
      console.dir(error)
      return { err: error }
    })

// get buffer data
export const getBlobData = url =>
  fetch(url)
    .then(response => response.blob())
    .catch(error => {
      console.dir(error)
      return { err: error }
    })

// get buffer data
export const getBufferData = url => {
  return fetch(url)
    .then(response => response.arrayBuffer())
    .catch(error => {
      console.dir(error)
      return { err: error }
    })
}

export const handleImage = (url, format = '') => {
  return new Promise((resolve) => {
    try {
      const image = document.getElementById(`left-${url}`)
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      canvas.getContext('2d').drawImage(image, 0, 0);
      canvas.toBlob(function(blob) {
        console.log('blob', blob)
        // const reader = new FileReader();
        // reader.addEventListener("loadend", function (){
        //   resolve(this.result)
        // });
        // reader.readAsArrayBuffer(blob);
      }, `image/${format.toLowerCase()}`);
    } catch (error) {
      resolve(new ArrayBuffer())
    }
  })
}
