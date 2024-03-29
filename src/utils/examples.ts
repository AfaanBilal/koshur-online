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
    };
};

karunPrintFibonacci(10, 0, 1);
`,
    'Factorial': `#
# Factorial
#
# Koshur lang (https://github.com/AfaanBilal/koshur-lang)
#

factorial = banav(n) {
    yeli n < 0 {
        0;
    } nate yeli n == 0 {
        1;
    } nate {
        n * factorial(n - 1);
    };
};

wan(factorial(3));
wan(factorial(5));
wan(factorial(7));
wan(factorial(10));
`,
    'Days to Y+M+D': `#
# Days to Years, Months, Days (approx)
#
# Koshur lang (https://github.com/AfaanBilal/koshur-lang)
#

numDays = 1080;

days = (numDays % 365) % 30;
months = ((numDays - days) % 365) / 30;
years = (numDays - days - 30 * months) / 365;

wan(numDays, "days are", years, "years", months, "months", days, "days.");
`,
    'Prime Numbers': `#
# Prime Numbers
#
# Koshur lang (https://github.com/AfaanBilal/koshur-lang)
#

yiChaPrime = banav(n, d) {
    yeli d == apuz {
        yiChaPrime(n, 2);
    } nate yeli d > n / 2 {
        poz;
    } nate {
        yeli n % d == 0 {
            apuz;
        } nate {
            yiChaPrime(n, d + 1);
        };
    };
};

yeli yiChaPrime(73) {
    wan("Aa,", 73, "chu prime!");
} nate {
    wan("Na sa!", 73, "chu ne prime!");
};

yeli yiChaPrime(93) {
    wan("Aa,", 93, "chu prime!");
} nate {
    wan("Na sa!", 93, "chu ne prime!");
};
`,
    'Raise Power': `#
# Raise to Power
#
# Koshur lang (https://github.com/AfaanBilal/koshur-lang)
#

khalPoweras = banav(x, n) {
    yeli n == 0 {
        1;
    } nate yeli n == 1 {
        x;
    } nate {
        x * khalPoweras(x, n - 1);
    };
};

wan(khalPoweras(10, 3));
wan(khalPoweras(2, 10));
`,
    'Count Digits': `#
# Count Digits
#
# Koshur lang (https://github.com/AfaanBilal/koshur-lang)
#

ginzrawDigit = banav(n) {
    yeli n < 10 {
        1;
    } nate {
        1 + ginzrawDigit((n - (n % 10)) / 10);
    };
};

wan(ginzrawDigit(2));
wan(ginzrawDigit(1234));
`,
    'Reverse Number': `#
# Reverse a Number
#
# Koshur lang (https://github.com/AfaanBilal/koshur-lang)
#

khalPoweras = banav(x, n) {
    yeli n == 0 {
        1;
    } nate yeli n == 1 {
        x;
    } nate {
        x * khalPoweras(x, n - 1);
    };
};

ginzrawDigit = banav(n) {
    yeli n < 10 {
        1;
    } nate {
        1 + ginzrawDigit((n - (n % 10)) / 10);
    };
};

karsaReverse = banav(n, i) {
    yeli i == apuz {
        karsaReverse(n, ginzrawDigit(n) - 1);
    } nate yeli n < 10 {
        n;
    } nate {
        khalPoweras(10, i) * (n % 10) + karsaReverse((n - (n % 10)) / 10, i - 1);
    };
};

wan(karsaReverse(123));
wan(karsaReverse(987654321));
`,
    'HCF / GCD': `#
# Highest Common Factor (HCF)
# Also known as Greatest Common Divisor (GCD)
#
# Koshur lang (https://github.com/AfaanBilal/koshur-lang)
#

hcf = banav(a, b) {
    yeli b == 0 {
        a;
    } nate {
        hcf(b, a % b);
    };
};

wan(hcf(10, 5));
wan(hcf(7, 49));
wan(hcf(19, 11));
wan(hcf(24, 18));
`,
    'Factors': `#
# Factors
#
# Koshur lang (https://github.com/AfaanBilal/koshur-lang)
#

factors = banav(n, i) {
    yeli i == apuz {
        factors(n, 1);
    } nate yeli i <= n / 2 {
        yeli n % i == 0 {
            wan(i);
        };

        factors(n, i + 1);
    };
};

wan("Factors of 10: ");
factors(10);

wan("Factors of 49: ");
factors(49);
`,
    'nCr': `#
#
# nCr
# Number of combinations when choosing r elements out of n.
#
# Koshur lang (https://github.com/AfaanBilal/koshur-lang)
#

factorial = banav(n) {
    yeli n < 0 {
        0;
    } nate yeli n == 0 {
        1;
    } nate {
        n * factorial(n - 1);
    };
};

nCr = banav(n, r) {
    factorial(n) / (factorial(n - r) * factorial(r));
};

wan(nCr(5, 2));
wan(nCr(8, 3));
`,
    'nPr': `#
#
# nPr
# Number of permutations when choosing r elements out of n.
#
# Koshur lang (https://github.com/AfaanBilal/koshur-lang)
#

factorial = banav(n) {
    yeli n < 0 {
        0;
    } nate yeli n == 0 {
        1;
    } nate {
        n * factorial(n - 1);
    };
};

nPr = banav(n, r) {
    factorial(n) / factorial(n - r);
};

wan(nPr(5, 2));
wan(nPr(8, 3));
`,
    'Linear Curve Fitting': `#
#
# Linear Curve Fitting
#
# Koshur lang (https://github.com/AfaanBilal/koshur-lang)
#

a = 0;
b = 0;
sign = "+";

fit = banav(x1, y1, x2, y2) {
    yeli x1 == x2 {
        wan("Hatsa x1 x2 kyazi same? Yim di sa badal.", "x1 =", x1, ", x2 =", x2);
    } nate {
        a = (y1 - y2) / (x1 - x2);
        b = ((x1 * y2) - (y1 * x2)) / (x1 - x2);

        yeli b > 0 {
            sign = "+";
        } nate yeli b < 0 {
            sign = "-";
            b = 0 - b;
        } nate yeli b == 0 {
            sign = "";
            b = "";
        };

        yeli a == 1 {
            a = " ";
        } nate yeli a == 0 - 1 {
            a = "-";
        };

        wan("Rathsa Linear equation: y =", a, "x", sign, b);
    };
};

fit(0, 0, 1, 1);
fit(0, 3, 1, 5);
fit(10, 3, 11, 5);
fit(5, 0-2, 6, 0-3);
fit(0-5, 24, 0-6, 33);
fit(0, 1, 0, 2);
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

wansaDaleel = banav(n, i) {
    yeli i == apuz {
        wan("Boz sa daleel asel paeth!");
        wansaDaleel(n, 1);
    } nate yeli i <= n {
        wan("Ye hasa daleel number", i);
        wansaDaleel(n, i + 1);
    } nate {
        wan("Bas, yuti ous!");
    };
};

wansaDaleel(5);
`
};
