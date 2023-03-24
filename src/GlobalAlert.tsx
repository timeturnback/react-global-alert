import React, { CSSProperties, FC, ReactElement, ReactNode, useEffect, useState } from 'react';

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

export const show = (info?: AlertInfo) => {
  if (setAlertVisible) {
    setAlertVisible(true);
  }
  if (info && setAlertInfo) {
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
  WrapperOverlay?: (props: any) => ReactElement;
  ModalPanel?: (props: any) => ReactElement;
  ButtonGroup?: (props: any) => ReactElement;
  ButtonCancel?: (props: any) => ReactElement;
  ButtonConfirm?: (props: any) => ReactElement;
  Title?: (props: any) => ReactElement;
  backgroundColor?: string;
  zIndex?: number;
}
export const GlobalAlert: FC<GlobalLoadingProps> = props => {
  const {
    WrapperOverlay,
    ModalPanel,
    ButtonGroup,
    ButtonCancel,
    ButtonConfirm,
    Title,
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
  const Wrapper = WrapperOverlay || DefaultWrapper;
  const DefaultPanel = ({ children }: { children: ReactNode }) => (
    <div style={$modal}>{children}</div>
  );
  const Panel = ModalPanel || DefaultPanel;

  return (
    <Wrapper {...rest} onClick={() => setIsVisible(false)}>
      <Panel>
        {Title ? (
          <Title title={info?.title} />
        ) : (
          <div style={$modalTitle}>{info?.title || 'Alert'}</div>
        )}
        <div style={$modalContent}>{info?.content || 'Are you sure ?'}</div>
        {ButtonGroup ? (
          <ButtonGroup onCancel={_onCancel} onConfirm={_onConfirm} />
        ) : (
          <div style={$btRow}>
            {ButtonCancel ? (
              <ButtonCancel onClick={_onCancel} />
            ) : (
              <button style={$buttonCancel} onClick={_onCancel}>
                {info?.cancelBtTitle || 'Cancel'}
              </button>
            )}
            {ButtonConfirm ? (
              <ButtonConfirm onClick={_onConfirm} />
            ) : (
              <button style={$buttonConfirm} onClick={_onConfirm}>
                {info?.confirmBtTitle || 'OK'}
              </button>
            )}
          </div>
        )}
      </Panel>
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
  marginTop: 10,
  gap: 10
};
const $buttonCancel: CSSProperties = {
  backgroundColor: '#fff',
  color: '#000',
  border: '1px solid #000',
  borderRadius: 5,
  padding: '8px 15px'
};
const $buttonConfirm: CSSProperties = {
  backgroundColor: '#000',
  color: '#fff',
  border: '1px solid #000',
  borderRadius: 5,
  padding: '8px 15px'
};
