# react-remove-transparent-bg

The Image Background Remover is a lightweight package designed to resize images by removing the transparent parts from an image. This utility is particularly useful for processing images where you want to focus on the main content without the surrounding transparent space, optimizing the image for better use in web and application development.

This functionality is particularly useful for processing images for e-commerce platforms, design applications, or any web-based project .

## Installation
To add this package to your project, execute the following command in your terminal:

```bash
npm i react-remove-transparent-bg

```
## Usage

First, import the necessary functions from the package in your React component:

```javascript
import removeTransparentBackground from 'react-remove-transparent-bg';

```
 ## use removeTransparentBackground function            

```javascript

const [imageFile, setImageFile] = useState<File>()
const formData = new FormData();

//-- Using formik
const image =await removeTransparentBackground(values.image as unknown as File)
formData.append('image', image);

//-- Using useState
const image = await removeTransparentBackground(imageFile as File);
formData.append('image', image);


```
## Complementing Package for Image Compression

To complement the functionality of the Image Background Remover, consider using @mbs-dev/react-image-compressor, an efficient package for compressing images within React JS applications.

npm Package URL: https://www.npmjs.com/package/@mbs-dev/react-image-compressor

Description: The @mbs-dev/react-image-compressor package offers a robust solution for reducing the file size of images without compromising quality. It's designed specifically for React applications, making it a seamless addition to your project alongside the Image Background Remover.