## 2.0.0-alpha.0 (2024-10-24)

### Features

* **2.x:** convert to ESM ([6120ba6](https://github.com/tduyng/pretty-output/commit/6120ba6e0502ad6790cb5740ce1dab3ec0305402))
* **2.x:** implement biome, remove eslint and prettier ([ab0842b](https://github.com/tduyng/pretty-output/commit/ab0842b935fef00f9ccabe98d74d465e13dc93fc))
* **2.x:** implement dual ESM & CJS bin commands ([6ad459d](https://github.com/tduyng/pretty-output/commit/6ad459d77a68b9f19ab067be17fb963323e1ae33))
* **2.x:** implement dual package ESM & CJS build process ([02c1147](https://github.com/tduyng/pretty-output/commit/02c114720889d2781b7685f7aaf646ab4db40f6e))
* **2.x:** remove lodash ([ea6738a](https://github.com/tduyng/pretty-output/commit/ea6738aabefcf0ab30d5129806932b809de18576))
* **2.x:** replace ts-node by tsx and update examples ([14d2ece](https://github.com/tduyng/pretty-output/commit/14d2ece30ff7b23044d9418f7eceb1341b1f8a6c))
* **2.x:** rewrite benchmarks in Typescript ([b9210e0](https://github.com/tduyng/pretty-output/commit/b9210e0254cd9b1794dd1bd39c0a7212ae4b31ee))
* **2.x:** rewrite in Typescript ([333c893](https://github.com/tduyng/pretty-output/commit/333c89324b61df745bc6261428ebf2d00b39988a))
* **2.x:** simplify and implement only nesscessary colors ([66fe738](https://github.com/tduyng/pretty-output/commit/66fe7387a1603428722e57906609554ceca844f4))
* add hideUndefined option ([d4db33d](https://github.com/tduyng/pretty-output/commit/d4db33df5b3eb5007e300210a0568297ca0c0717))
* **init:** First commit ([18c88c2](https://github.com/tduyng/pretty-output/commit/18c88c2a9251fc3578b55864f67c4cc94ccbc146))

### Bug Fixes

* **2.x:** fix benchmark scripts ([8f7febd](https://github.com/tduyng/pretty-output/commit/8f7febd621b3cb5d502c930e222c6ffe30d9d6d9))
* **2.x:** fix commander syntax for v12 ([11fe39f](https://github.com/tduyng/pretty-output/commit/11fe39fd95912709235c22a72f36835fa8285d7c))
* **2.x:** fix default colors options ([e0b55b9](https://github.com/tduyng/pretty-output/commit/e0b55b9882e06fe61d385ac1b0a8f024b09bfdb7))
* **2.x:** fix ESM syntaxt for bin commands ([422ee99](https://github.com/tduyng/pretty-output/commit/422ee99c570b12b6133b4fd9f198dbd210664864))
* **2.x:** fix indentation issues ([c41a29a](https://github.com/tduyng/pretty-output/commit/c41a29aae7255b5c82c0badc1de6351a89d57fbf))
* **2.x:** fix repeat function ([9ef9541](https://github.com/tduyng/pretty-output/commit/9ef9541164a4218a65b901f85a27ea874a779282))
* **2.x:** handle correctly null object ([909eab4](https://github.com/tduyng/pretty-output/commit/909eab42bd6a1902ef9c749ff7eee395c92d1223))
* remove redundant checks, return undefined instead of null ([e91e2e8](https://github.com/tduyng/pretty-output/commit/e91e2e828eabbf1de3902db1489ce1e9aeebe846))
* upgrade lodash version to resolve a vulnerability ([4a9b08d](https://github.com/tduyng/pretty-output/commit/4a9b08d252e28ec621d24b63db83941d55cf1a05)), closes [#4](https://github.com/tduyng/pretty-output/issues/4)
* use isBoolean to be consistent ([c10a3af](https://github.com/tduyng/pretty-output/commit/c10a3af76617e2aa0dfd404c9b1de86a5dd22ed0))

### Performance Improvements

* **2.x:** add dumper in benchmark ([bfd691a](https://github.com/tduyng/pretty-output/commit/bfd691a4fa9a4b48b4cba2ad729b45c5cd65ec14))
* **2.x:** add new benchmark results include dumper library ([f0f5839](https://github.com/tduyng/pretty-output/commit/f0f5839616c215ce81639ce1dc34fef98d0e0833))
* **2.x:** correct faster time ([0bcdc78](https://github.com/tduyng/pretty-output/commit/0bcdc78c1c2e68c09edfd1f7a0fced16b8b4a9b0))
* **2.x:** reduce build time ([d0e4830](https://github.com/tduyng/pretty-output/commit/d0e48301b84f0ea9b653870e16b1ccf627749be5))
* **2.x:** simplify methods to avoid memory consumption ([cb39ac4](https://github.com/tduyng/pretty-output/commit/cb39ac403d4012bcbe569b3c0e506acee7f03f65))
* **2.x:** use simple loop and caching for utils ([ce7607d](https://github.com/tduyng/pretty-output/commit/ce7607d764fdff3e92b4f025893a383bce3300cb))

## 1.2.0 (2019-01-10)

* chore: bump version to 1.2.0 ([6681727](https://github.com/tduyng/pretty-output/commit/6681727))
* chore: updated all dependencies ([7534f13](https://github.com/tduyng/pretty-output/commit/7534f13))
* Fix: upgrade lodash version to resolve a vulnerability ([4a9b08d](https://github.com/tduyng/pretty-output/commit/4a9b08d)), closes [#4](https://github.com/tduyng/pretty-output/issues/4)
* Add option to turn off aligning key values ([d101922](https://github.com/tduyng/pretty-output/commit/d101922))
* Handle undefined values ([521c723](https://github.com/tduyng/pretty-output/commit/521c723))
* Use _.isBoolean instead of _.has for opts.alignKeyValues ([2d7c7b7](https://github.com/tduyng/pretty-output/commit/2d7c7b7))



## 1.1.0 (2016-11-27)

* Support streamed output. ([b573f6a](https://github.com/tduyng/pretty-output/commit/b573f6a))
* update version ([e81dd18](https://github.com/tduyng/pretty-output/commit/e81dd18))



## 1.0.0 (2016-11-10)

* bug(mixed): Make it compatible with node + missing doc + fix badges ([df2548c](https://github.com/tduyng/pretty-output/commit/df2548c))
* bug(node): Fix node version support ([5866520](https://github.com/tduyng/pretty-output/commit/5866520))
* feat(init): First commit ([18c88c2](https://github.com/tduyng/pretty-output/commit/18c88c2))
* Initial commit ([33c5971](https://github.com/tduyng/pretty-output/commit/33c5971))
