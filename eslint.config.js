import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      ecmaVersion: "latest",              // Gunakan versi terbaru ECMAScript
      sourceType: "module",               // Mendukung ES Modules
      globals: globals.browser,           // Gunakan global variable di browser
    },
    files: ["**/*.js"],                   // Berlaku untuk semua file JS
    rules: {
      "no-var": "error",                  // Larang penggunaan 'var'
      "prefer-const": "error",            // Anjurkan penggunaan 'const' jika memungkinkan
      "semi": ["error", "always"],        // Wajib titik koma
      "quotes": ["error", "double"],      // Gunakan tanda kutip ganda
      "space-in-parens": ["error", "never"], // Tidak boleh ada spasi dalam kurung
      "space-before-function-paren": ["error", "never"], // Tidak boleh ada spasi sebelum tanda kurung fungsi
      "no-unused-vars": "warn",           // Peringatkan jika ada variabel yang tidak digunakan
      "eqeqeq": ["error", "always"],      // Wajib pakai '===' daripada '=='
      "curly": "error",                   // Pakai kurung kurawal di semua blok kode
    },
  },
  pluginJs.configs.recommended,           // Konfigurasi standar dari ESLint
];
