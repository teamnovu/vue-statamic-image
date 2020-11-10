# Vue-Statamic-Image

Responsive image component

Uses the image attributes srcSet and sizes to responsively display an an image from statamic.

Generates srcSet with a placeholder for lazyloading based on screen sizes passed in options and adjusts the sizes attribute depending on the screen size.

## Installation

```shell
npm i vue-statamic-image
```

## Setup

```javascript
Vue.use(StatamicImage, {
  statamicAssetUrl: "localhost:3000/img",
});
```

## Usage

```html
<StatamicImage src="/assets/image.jpg" />
```

## Plugin Options

| Option           | Default                                             | Required | Type   |
| ---------------- | --------------------------------------------------- | -------- | ------ |
| statamicAssetUrl | null                                                | true     | String |
| screenSizes      | [default screen sizes](src/default-screen-sizes.js) | false    | Object |

## Attributes

| Attribute           | Default | Required | Type    | Description                                                                                                                                                                                                    |
| ------------------- | ------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| src                 | null    | true     | String  | Relative path to image from statamicAssetUrl                                                                                                                                                                   |
| quality             | 70      | false    | Number  | Glide Option                                                                                                                                                                                                   |
| blur                | null    | false    | Number  | Glide Option                                                                                                                                                                                                   |
| fit                 | null    | false    | String  | Glide Option                                                                                                                                                                                                   |
| crop                | null    |  false   | String  | Glide Option                                                                                                                                                                                                   |
| format              | null    | false    | String  | Glide Option                                                                                                                                                                                                   |
| fallbackWidth       | null    | false    | Number  | If srcSet and sizes are not supported in the clients browser, this will be the fixed width of the image itself (not css width)                                                                                 |  |
|  aspectRatio        |  null   |  false   |  Number | If you set this attribute the component will ignore the placeholderDataUrl attribute and load the placeholder image from statamic because the aspect ratio would change between placeholder and the real image |
|  placeholderDataUrl | null    | false    | String  |  If this attribute is set all other placeholder options are ignored and this url is used as the placeholder source.                                                                                            |
|  placeholderBlur    | 100     | false    | Number  |  Glide Option                                                                                                                                                                                                  |
| placeholderQuality  | 30      |  false   | Number  | Glide Option                                                                                                                                                                                                   |
| placeholderWidth    | 400     |  false   | Number  | Glide Option                                                                                                                                                                                                   |
| usePlaceholder      |  true   |  false   | Boolean | If this attribute is set to false, no placeholder will be displayed and the original image will be rendered immediately                                                                                        |

## Example

```html
<StatamicImage
  src="/assets/image.jpg"
  format="webp"
  :quality="80"
  placeholderDataUrl="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDo etc"
/>
```
