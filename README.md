# Lab41 - Proof of Life iOS on React Native

## Introduction

This README provides instructions on how to install and use the application. Please follow the steps below to ensure a smooth setup and execution.

## Installation

1. Run the command `npx expo install expo-contacts` in your terminal.
2. Run the command `npx expo install expo-location` in your terminal.
3. Run the command `npm start` in your terminal.
4. Choose the iOS version you want to use.
5. Make sure you have the latest version of Xcode installed.
6. Ensure your Simulator is updated and has iOS installed.

### Native Base
- Here are some useful packages for extending functionality
- [Docs found here](docs.nativebase.io/install-expo)
- `npm install native-base`
- `npx expo install react-native-svg@12.1.1`
- `npx expo install react-native-safe-area-context@3.3.2`

### How to Publish to Expo
- install the EAS cli `npm install -g eas-cli`
- login to your expo account `eas login`
- Push the update to Expo `eas update`

### How to upload to iOS
- [docs here](docs.expo.dev/submit/ios)
- [how to build](http://docs.expo.dev/build/setup)
- Remember to update the app.json (read docs)
- `eas build`


## Troubleshooting

If you encounter any issues, please refer to the official Expo documentation or raise an issue in this repository.
[docs.expo.dev](https://docs.expo.dev/)


## User Stories

1. As a user, I want to view all my contacts in the app so that I can easily access their information.
2. As a user, I want the app to access my device's location so that I can share it with my contacts if needed.

## Wireframe

+-----------------------------------+
|                                   |
|         SafeAreaView              |
|                                   |
|   +-----------------------------+ |
|   |                             | |
|   |         Container           | |
|   |                             | |
|   |   +---------------------+   | |
|   |   |                     |   | |
|   |   |     FlatList        |   | |
|   |   |                     |   | |
|   |   +---------------------+   | |
|   |                             | |
|   +-----------------------------+ |
|                                   |
|   +-----------------------------+ |
|   |                             | |
|   |         Footer              | |
|   |                             | |
|   |   +---------------------+   | |
|   |   |                     |   | |
|   |   |     Location Info   |   | |
|   |   |                     |   | |
|   |   +---------------------+   | |
|   |                             | |
|   +-----------------------------+ |
|                                   |
+-----------------------------------+