import * as React from "react";

export default function Document({ children }) {
  return (
    <html class="no-js" lang="">
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <title>Saber</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="root">{children}</div>
        xxx
      </body>
    </html>
  );
}
