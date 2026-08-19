/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    /** 当前语言，由 middleware 根据 cookie / Accept-Language 决定 */
    lang: "zh" | "en";
  }
}
