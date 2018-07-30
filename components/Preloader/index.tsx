// @flow

import React, { Fragment } from 'react';

interface Props {
  height?: number,
};

const Preloader = ({ height }: Props) => (
  <Fragment>
    <div className="text-center">
      <div className="preloader" style={{ height }}>
        <div className=".bounce bounce--1" />
        <div className=".bounce bounce--2" />
        <div className=".bounce" />
      </div>
    </div>
    <style jsx>
      {`
        .preloader {
          display: inline-flex;
          width: 70px;
          height: 18px;
        }
        .bounce {
          width: 18px;
          height: 18px;
          margin: auto;
          background-color: #0a78b3;
          border-radius: 100%;
          animation: sk-bouncedelay 1.4s infinite ease-in-out both;
        }
        .bounce--1 {
          animation-delay: -0.32s;
        }
        .bounce--2 {
          animation-delay: -0.16s;
        }
        @keyframes sk-bouncedelay {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}
    </style>
  </Fragment>
);

Preloader.defaultProps = {
  height: 548,
};

export default Preloader;
