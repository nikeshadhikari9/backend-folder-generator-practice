/**
 * @file logger.js
 * @description
 * A custom logging utility for CLI output using ANSI escape codes.
 *
 * Features:
 * - Provides styled console logs with color + intensity.
 * - Supports predefined "basic log types" (info, success, error, etc.).
 * - Supports custom styles like `"red.intense"` or `"blue.dim"`.
 *
 * @example
 * logger("success", "Build completed!");
 * logger("red.intense", "Fatal error occurred!");
 * logger("info", "Server is running on port 3000...");
 */

/**
 * ANSI escape codes grouped by color and intensity.
 *
 * Intensity levels:
 * - `dim`: lower brightness
 * - `normal`: standard color
 * - `intense`: bright/bold version
 *
 * @type {Object<string, Object<string, string>>}
 */
const colorPalette = {
    black: {
        dim: "\x1b[90m%s\x1b[0m",
        normal: "\x1b[30m%s\x1b[0m",
        intense: "\x1b[30;1m%s\x1b[0m"
    },
    red: {
        dim: "\x1b[31m%s\x1b[0m",
        normal: "\x1b[31;22m%s\x1b[0m",
        intense: "\x1b[31;1m%s\x1b[0m"
    },
    green: {
        dim: "\x1b[32m%s\x1b[0m",
        normal: "\x1b[32;22m%s\x1b[0m",
        intense: "\x1b[32;1m%s\x1b[0m"
    },
    yellow: {
        dim: "\x1b[33m%s\x1b[0m",
        normal: "\x1b[33;22m%s\x1b[0m",
        intense: "\x1b[33;1m%s\x1b[0m"
    },
    blue: {
        dim: "\x1b[34m%s\x1b[0m",
        normal: "\x1b[34;22m%s\x1b[0m",
        intense: "\x1b[34;1m%s\x1b[0m"
    },
    magenta: {
        dim: "\x1b[35m%s\x1b[0m",
        normal: "\x1b[35;22m%s\x1b[0m",
        intense: "\x1b[35;1m%s\x1b[0m"
    },
    cyan: {
        dim: "\x1b[36m%s\x1b[0m",
        normal: "\x1b[36;22m%s\x1b[0m",
        intense: "\x1b[36;1m%s\x1b[0m"
    },
    white: {
        dim: "\x1b[37m%s\x1b[0m",
        normal: "\x1b[37;22m%s\x1b[0m",
        intense: "\x1b[37;1m%s\x1b[0m"
    }
};

/**
 * Common semantic log styles for quick use.
 * Maps log type keywords to predefined colors from {@link colorPalette}.
 *
 * @type {Object<string, string>}
 * @property {string} info - White (normal)
 * @property {string} success - Green (intense)
 * @property {string} error - Red (intense)
 * @property {string} response - Blue (normal)
 * @property {string} warn - Yellow (normal)
 * @property {string} debug - Black (dim/gray)
 */
const basicLogColors = {
    info: colorPalette.white.normal,
    success: colorPalette.green.intense,
    error: colorPalette.red.intense,
    response: colorPalette.blue.normal,
    warn: colorPalette.yellow.normal,
    debug: colorPalette.black.dim
};

/**
 * Resolves a custom color style string like `"red.intense"`.
 *
 * @param {string} logColorStyle - A style string in format `"color.intensity"`.
 * @returns {string} ANSI escape code for that color/intensity.
 *
 * @example
 * getStyle("blue.dim"); // → "\x1b[34m%s\x1b[0m"
 */
function getStyle(logColorStyle) {
    const [color, intensity] = logColorStyle.split(".");
    return colorPalette[color]?.[intensity] || colorPalette.white.normal;
}

/**
 * Main logger function.
 *
 * @function
 * @param {string} logColorStyle - Either:
 *   - A predefined log type (`info`, `success`, `error`, `warn`, `response`, `debug`)
 *   - A custom style in `"color.intensity"` format (e.g., `"blue.dim"`)
 * @param {string} logText - The message to display in the console.
 * @returns {void} Prints styled text directly to the console.
 *
 * @example
 * logger("success", "Data saved successfully!");
 * logger("yellow.dim", "This is a warning in dim yellow.");
 */
function logger(logColorStyle, logText) {
    if (!logText) {
        console.log(colorPalette.red.intense, "Text or style is missing.");
        return;
    }

    // Default to white.normal if no style found
    let style = colorPalette.white.normal;

    if (logColorStyle.includes(".")) {
        style = getStyle(logColorStyle);
    } else {
        style = basicLogColors[logColorStyle];
    }

    console.log(style, logText);
}

module.exports = logger;
