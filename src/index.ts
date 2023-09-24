function removeTransparentBackground(imageFile: File): Promise<File> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            if (!event.target || !(event.target instanceof FileReader)) {
                reject(new Error('Failed to read image file.'));
                return;
            }

            const imageSrc = event.target.result as string;

            const image = new Image();
            image.src = imageSrc;

            image.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    reject(new Error('Could not create canvas context'));
                    return;
                }

                canvas.width = image.width;
                canvas.height = image.height;

                ctx.drawImage(image, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                let minX = canvas.width;
                let minY = canvas.height;
                let maxX = 0;
                let maxY = 0;

                for (let x = 0; x < canvas.width; x++) {
                    for (let y = 0; y < canvas.height; y++) {
                        const index = (y * canvas.width + x) * 4;

                        if (imageData.data[index + 3] !== 0) {
                            minX = Math.min(minX, x);
                            minY = Math.min(minY, y);
                            maxX = Math.max(maxX, x);
                            maxY = Math.max(maxY, y);
                        }
                    }
                }

                const newWidth = maxX - minX + 1;
                const newHeight = maxY - minY + 1;

                const newCanvas = document.createElement('canvas');
                const newCtx = newCanvas.getContext('2d');

                if (!newCtx) {
                    reject(new Error('Could not create new canvas context'));
                    return;
                }

                newCanvas.width = newWidth;
                newCanvas.height = newHeight;

                newCtx.drawImage(canvas, minX, minY, newWidth, newHeight, 0, 0, newWidth, newHeight);

                newCanvas.toBlob(
                    (blob) => {
                        if (blob) {

                            const newFile = new File([blob], imageFile.name, { type: imageFile.type });
                            resolve(newFile);
                        } else {
                            reject(new Error('Error converting canvas to Blob'));
                        }
                    },
                    imageFile.type,
                    1
                );
            };

            image.onerror = () => {
                reject(new Error('Error loading the image'));
            };
        };

        reader.onerror = () => {
            reject(new Error('Error reading image file.'));
        };

        reader.readAsDataURL(imageFile);
    });
};

export default removeTransparentBackground;