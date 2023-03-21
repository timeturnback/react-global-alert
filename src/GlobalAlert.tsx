import React, { CSSProperties, FC, ReactElement, ReactNode, useEffect, useState } from 'react';
import { Loading } from './Loading';

type AlertInfo = {
  title?: string;
  content?: string;
  cancelBtTitle?: string;
  confirmBtTitle?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
};

type Listener<T> = React.Dispatch<React.SetStateAction<T>> | ((value: T) => void);
export let setAlertVisible: Listener<boolean> = () => {};

export let setAlertInfo: Listener<AlertInfo> = () => {};

export const show = (info: AlertInfo) => {
  if (setAlertVisible) {
    setAlertVisible(true);
  }
  if (setAlertInfo) {
    setAlertInfo(info);
  }
};

export const hide = () => {
  if (setAlertVisible) {
    setAlertVisible(false);
  }
};

export const globalAlert = {
  show,
  hide
};

interface GlobalLoadingProps {
  children?: React.ReactNode;
  WrapperComponent?: (props: any) => ReactElement;
  backgroundColor?: string;
  zIndex?: number;
  loadingSize?: number;
  loadingColor?: string;
  loadingThickness?: number;
  loadingSpeed?: number;
}
export const GlobalAlert: FC<GlobalLoadingProps> = props => {
  const {
    children,
    WrapperComponent,
    loadingSize = 70,
    loadingColor = '#eee',
    loadingSpeed = 1,
    loadingThickness = 7,
    backgroundColor = 'rgba(0, 0, 0, 0.6)',
    zIndex = 999,
    ...rest
  } = props || {};
  const [isVisible, setIsVisible] = useState(false);
  const [info, setInfo] = useState<AlertInfo>({});

  useEffect(() => {
    setAlertVisible = setIsVisible;
    setAlertInfo = setInfo;
  }, []);

  const style = {
    ...$globalLoading,
    zIndex,
    backgroundColor
  };

  if (!isVisible) return null;

  const _onCancel = () => {
    setIsVisible(false);
    if (info?.onCancel) info.onCancel();
  };

  const _onConfirm = () => {
    setIsVisible(false);
    if (info?.onConfirm) info.onConfirm();
  };

  const DefaultWrapper = ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => (
    <div style={style} onClick={onClick}>
      {children}
    </div>
  );
  const Wrapper = WrapperComponent || DefaultWrapper;

  return (
    <Wrapper {...rest} onClick={() => setIsVisible(false)}>
      <div style={$modal}>
        <div style={$modalTitle}>{info?.title || 'Alert'}</div>
        <div style={$modalContent}>{info?.content || 'Are you sure ?'}</div>
        <div style={$btRow}>
          <button style={$buttonCancel} onClick={_onCancel}>
            {info?.cancelBtTitle || 'Cancel'}
          </button>
          <button style={$buttonConfirm} onClick={_onConfirm}>
            {info?.confirmBtTitle || 'OK'}
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const $globalLoading: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100vw',
  height: '100vh',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};
const $modal: CSSProperties = {
  maxWidth: 800,
  minWidth: 500,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  backgroundColor: '#fff',
  borderRadius: 5,
  padding: 20
};
const $modalTitle: CSSProperties = {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10
};
const $modalContent: CSSProperties = {
  fontSize: 16,
  marginBottom: 10
};
const $btRow: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: 10
};
const $buttonCancel: CSSProperties = {
  backgroundColor: '#fff',
  color: '#000',
  border: '1px solid #000',
  borderRadius: 5,
  padding: '8px 15px',
  marginRight: 10
};
const $buttonConfirm: CSSProperties = {
  backgroundColor: '#000',
  color: '#fff',
  border: '1px solid #000',
  borderRadius: 5,
  padding: '8px 15px'
};
