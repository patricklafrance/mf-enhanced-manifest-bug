import { join } from "lodash";
import { version } from "useless-lib";

console.log("remote-2", version);

export function sayHello() {
    return join(["Hello", "from", "remote-2"], "-");
}