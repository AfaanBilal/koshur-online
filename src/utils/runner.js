/**
 * Koshur Online
 *
 * @link        https://koshur.afaan.dev
 *
 * @author      Afaan Bilal
 * @link        https://afaan.dev
 * @link        https://github.com/AfaanBilal/koshur-online
 * @license     MIT
 * @copyright   2024 Afaan Bilal
 */

import { TokenStream } from '../../koshur-lang/koshur/lexer.js';
import { parse } from "../../koshur-lang/koshur/parser.js";
import { InputStream } from "../../koshur-lang/koshur/input.js";
import { Environment, evaluate } from "../../koshur-lang/koshur/evaluator.js";

export const runner = (logger, code) => {
    var gE = new Environment();
    gE.def("wan", (...v) => logger(...v));

    return evaluate(parse(TokenStream(InputStream(code))), gE);
};
