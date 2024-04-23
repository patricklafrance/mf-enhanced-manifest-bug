import { join } from "lodash";
import { version } from "useless-lib";

console.log("remote-1", version);

export function HelloWorld() {
    return (
        <div>{join(["Hello", "from", "remote-1"], "-")}</div>
    )
}