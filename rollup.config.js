import typescript from "rollup-plugin-ts"
import {lezer} from "@lezer/generator/rollup"
import resolve from "@rollup/plugin-node-resolve"

export default {
  input: "src/index.ts",
  // external: id => id != "tslib" && !/^(\.?\/|\w:)/.test(id),
  output: {
    file: "dist/lang-coem.js"
  },
  plugins: [lezer(), typescript(), resolve()]
}
