console.log("...inner");
// import { Readable } from 'stream'
import * as Stream from "stream";

var src = new Stream();
src.readable = true;

var dest = new Stream();
dest.writable = true;
dest.write = function (data) {
  console.log(data == "test");
};

src.pipe(dest);

src.emit("data", "test");
