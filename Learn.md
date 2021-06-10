1. v1 string vs stream

string:
size: 308/449B
TTFB: 7.19ms, 2.68ms, 1.77ms, 3.93ms
download: 3.06ms, 3.06ms, 2.78ms, 4.24ms
all: 27ms, 17.19ms, 26.26ms, 21.59ms

stream:
size: 295/489B
TTFB: 3.01ms, 2.13ms, 3.98ms
download: 7.2ms, 6.76ms, 8.83ms
all: 23.3ms, 15.27ms, 18.27ms

2. hot-load 想用 nodemon 实现，只能实现 server 部分更新。

<!-- https://stackoverflow.com/questions/22062298/automatically-reloading-koa-server -->

比如命令为 `node_modules/.bin/nodemon node_modules/.bin/ts-node src/core/v1/server/index.tsx` 不接受变化

命令为 `node_modules/.bin/nodemon -x "node_modules/.bin/ts-node" src/core/v1/server/index.tsx`
修改 client 文件比如 about.jsx 后，不需要重启服务，刷新页面即可以看到新的效果。
修改 server 文件比如 server/index.tsx 的 main 函数，刷新页面，看终端也能看到新的效果。

3. hmr

https://user-images.githubusercontent.com/8243326/121461080-bdda7500-c9e0-11eb-8e55-f8d39ac32b81.png
