# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Repo governance and automation (CI/CodeQL/Dependabot/templates)
- ESLint + Prettier + Jest baseline
- Error Boundary global
- Centralized env config (`lib/config.js`) and safer NextAuth config

### Changed

- Project organization (removed duplicates, moved MainLayout)

## [1.2.2] - 2023-08-23

### Changed

- Update dependencies
- Fix installation issue when running `npm i`

## [1.2.1] - 2022-08-15

### Changed

- Fixed the issues
- Updated dependencies
- Migration to React 18
- Migration to sass from node-sass

## [1.2.0] - 2021-05-14

### Fixed

- Moved all images inside `public` folder (i.e. moved from `assets/img` to `public/img`)

### Changed

- Moved all styles to `styles/` (from `assets/`)

### Removed

- `@zeit/next-sass`
- `react-swipeable-views`

## [1.1.0] - 2020-05-08

### Fixed

- Multiple upstream issues from the original template

## [1.0.0] - 2019-09-13

### Added

- Original release (NextJS + Material Kit base)
