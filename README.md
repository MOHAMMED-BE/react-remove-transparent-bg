# Remove Transparent Background

A package for removing transparent backgrounds from images.

## Installation

To install this package, run:

npm install react-remove-transparent-bg

## Usage

```javascript
import removeTransparentBackground from 'react-remove-transparent-bg';

const formData = new FormData();

const image = await removeTransparentBackground(imageFile as File);

formData.append('image', image);
