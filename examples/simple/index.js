/// <reference types="es4x" />
// @ts-check

// get the home dir from the environment
let npmrc = vertx.fileSystem()
  .readFileBlocking(`${process.env.get("HOME")}/.npmrc`);

console.log(npmrc.toString());
