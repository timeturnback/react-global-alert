# React Global Alert

![Example](/assets/example.png)

[![npm version](https://badge.fury.io/js/react-global-alert.svg)][npm_url]
[![downloads](https://img.shields.io/npm/dt/react-global-alert.svg)][npm_url]
[![license](https://img.shields.io/npm/l/react-global-alert.svg)][npm_url]

[npm_url]: https://www.npmjs.org/package/react-global-alert

React simple global loading package

## Installation

With Yarn:

```bash
yarn add react-global-alert
```

With npm:

```bash
npm install --save react-global-alert
```

## Getting Started

Add the globalAlert to your app first (should be at root component like index.js or app.js). It will take care of rendering global loading . Now you can trigger `globalAlert.show()` and `globalAlert.hide()` from anywhere!

```tsx
import { GlobalAlert, globalAlert } from 'react-global-alert';

const App = () => {
  const show = () => {
    globalAlert.show();
  };

  const showWithCustomInfo = () => {
    globalAlert.show({
      title: 'Alert title',
      content: 'Some content',
      onCancel: () => console.log('Alert cancel'),
      onConfirm: () => console.log('Alert confirm')
    });
  };

  return (
    <div>
      <button onClick={show}>Show Alert</button>
      <button onClick={showWithCustomInfo}>Show Alert with custom info</button>
      <GlobalAlert />
    </div>
  );
};
```

## Custom Alert Components

![Custom component](/assets/custom-components.png)

```tsx
<GlobalAlert
  WrapperOverlay={props => (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 120, 220, 0.3)',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      {...props} // Important
    />
  )}
  ModalPanel={({ children }) => (
    <div className="flex flex-col items-center rounded-lg bg-gray-300 p-5">{children}</div>
  )}
  Title={({ title }) => <h1 className="text-2xl font-bold text-blue-500">{title}</h1>}
  ButtonGroup={({ onCancel, onConfirm }) => (
    <div className="flex gap-2">
      <button
        className="rounded-lg border border-blue-500 bg-blue-200 p-2 text-white"
        onClick={onCancel}
      >
        Cancel
      </button>
      <button className="rounded-lg bg-blue-500 p-2 text-white" onClick={onConfirm}>
        Confirm
      </button>
    </div>
  )}
  ButtonCancel={(
    props // ButtonCancel will be ignored if ButtonGroup is provided
  ) => (
    <button className="rounded-lg border border-blue-500 bg-blue-200 p-2 text-white" {...props}>
      Cancel Alert
    </button>
  )}
  ButtonConfirm={(
    props // ButtonConfirm will be ignored if ButtonGroup is provided
  ) => (
    <button className="rounded-lg bg-blue-500 p-2 text-white" {...props}>
      Confirm Alert
    </button>
  )}
/>
```

## Other way to show alert

```tsx
import { show, hide } from 'react-global-alert'';
show(); // show
hide(); // hide

import { globalAlert } from 'react-global-alert'';
globalAlert.show(); // show
globalAlert.hide(); // hide
```

<details><summary> Available Loaders, PropTypes, and Default Values</summary>

Default props:

```
interface GlobalLoadingProps {
  WrapperComponent?: (props: any) => ReactElement;
  backgroundColor?: string;
  zIndex?: number;
}
```

### `WrapperComponent` prop

The wrapper component ( background screen )

```tsx
<globalAlert WrapperComponent={() => <div style={style} />} />;

// suggested style
style = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};
```

</details>
