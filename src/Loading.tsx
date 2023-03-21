import React from 'react';

export const Loading = ({
  loadingSize = 70,
  loadingColor = '#eee',
  loadingSpeed = 1,
  loadingThickness = 7
}) => {
  return (
    <>
      <style>{`
            @keyframes spin {
                 0% { transform: rotate(0deg); }
                 100% { transform: rotate(360deg); }
            }
        `}</style>
      <div
        style={{
          position: 'relative',
          animation: `spin ${loadingSpeed}s linear infinite`
        }}
      >
        <div
          style={{
            width: loadingSize,
            height: loadingSize,
            borderRadius: '50%',
            border: `${loadingThickness}px solid`,
            borderTopColor: `${loadingColor}`
          }}
        />
        <div
          style={{
            width: loadingSize,
            height: loadingSize,
            borderRadius: '50%',
            border: `${loadingThickness}px solid rgba(255, 255, 255, 0.5)`,
            position: 'absolute',
            top: 0
          }}
        />
      </div>
    </>
  );
};
