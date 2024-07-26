const removeTransparentBackground = async (file: File): Promise<File> => {
    const loadImage = (file: File): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = URL.createObjectURL(file);
      });
    };
  
    const cropImage = (img: HTMLImageElement): HTMLCanvasElement => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) throw new Error('Unable to get 2D context');
  
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
  
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const { data, width, height } = imageData;
  
      let minX = width, minY = height, maxX = 0, maxY = 0;
  
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const alpha = data[(y * width + x) * 4 + 3];
          if (alpha > 0) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
  
      const croppedWidth = maxX - minX + 1;
      const croppedHeight = maxY - minY + 1;
      const croppedCanvas = document.createElement('canvas');
      croppedCanvas.width = croppedWidth;
      croppedCanvas.height = croppedHeight;
  
      const croppedCtx = croppedCanvas.getContext('2d');
      if (!croppedCtx) throw new Error('Unable to get 2D context for cropped canvas');
  
      croppedCtx.drawImage(
        canvas,
        minX, minY, croppedWidth, croppedHeight,
        0, 0, croppedWidth, croppedHeight
      );
  
      return croppedCanvas;
    };
  
    const canvasToFile = (canvas: HTMLCanvasElement, fileName: string): Promise<File> => {
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const newFile = new File([blob], fileName, { type: 'image/png' });
            resolve(newFile);
          }
        }, 'image/png');
      });
    };
  
    const img = await loadImage(file);
    const croppedCanvas = cropImage(img);
    const newFile = await canvasToFile(croppedCanvas, file.name);
  
    return newFile;
  };

export default removeTransparentBackground;