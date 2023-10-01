import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_34fb5') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: true,
            symbol: "BINANCE:BTCUSDT",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "0",
            locale: "ru",
            enable_publishing: false,
            hide_side_toolbar: false,
            allow_symbol_change: true,
            watchlist: ["MOEX:SI1!","MOEX:BR1!","MOEX:NG1!"],
            hotlist: true,
            studies: ["STD;MACD","STD;RSI"],
            container_id: "tradingview_34fb5"
          });
        }
      }
    },
    []
  );

  return (
    <div className='tradingview-widget-container h-full'>
      <div id='tradingview_34fb5' className='h-3/5' />
      <div className="tradingview-widget-copyright">
        <a href="https://ru.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Следите за рынками на TradingView</span></a>
      </div>
    </div>
  );
}
