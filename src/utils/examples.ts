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

export default {
    'Hello world!': `#
# Hello world!
#
# Koshur lang (https://github.com/AfaanBilal/koshur-lang)
#

wan("Hello, world!");
`,
    'Arithmetic': `#
# Arithmetic
#
# Koshur lang (https://github.com/AfaanBilal/koshur-lang)
#

wan("1 + 2 =", 1 + 2);

wan("1 - 2 =", 1 - 2);

wan("1 * 2 =", 1 * 2);

wan("1 / 2 =", 1 / 2);
    `,
    'Control Flow': `#
# Control Flow
#
# Koshur lang (https://github.com/AfaanBilal/koshur-lang)
#

x = 10;

yeli x > 5 {
    wan("5 nish bod");
} nate {
    wan("5 nish lakut");
}
`,
    'Functions': `#
# Functions
#
# Koshur lang (https://github.com/AfaanBilal/koshur-lang)
#

bod-kus = banav(x, y) yeli x > y teli x nate y;
wan("Bod chu:", bod-kus(2, 3));

`,
    'Fibonacci': `#
# Fibonacci
#
# Koshur lang (https://github.com/AfaanBilal/koshur-lang)
#

karunPrintFibonacci = banav(hadd, aediuk, patium) {
    yeli (hadd > 0) {
        wan(aediuk + patium);
        karunPrintFibonacci(hadd - 1, patium, aediuk + patium);
    }
};

karunPrintFibonacci(10, 0, 1);
`,
    'Test': `#
# Test
#
# Koshur lang (https://github.com/AfaanBilal/koshur-lang)
#

# This is a comment

wan("Hello!");

x = 10;
y = 20;

wan(x); # Prints 10
wan(y); # Prints 20

yeli poz {
    wan("Poz chu!");
} nate {
    wan("Apuz hasa!");
};

yeli apuz teli
    wan("apuz!")
nate
    wan("poz!");

bod-kus = banav(x, y) yeli x > y teli x nate y;

wan(bod-kus(10, 20)); # Prints 20

# Shortcut for banav is λ

lakut-kus = λ(x, y) yeli x < y teli x nate y;

wan(lakut-kus(10, 20)); # Prints 10

wan("x =", x, "y =", y);
`
};
