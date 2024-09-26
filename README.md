## create new template project flow

1. npx create-expo-app@latest -t

## folder struture

- app : app navigation by router
- src : all logic code

## core library

- state management: zustand
- storage: react-native-mmkv ( not a database, don't store useless data)
- animation: react-native-reanimated
- translation: react-i18next

## some useful library

- bottom sheet: @gorhom/bottom-sheet
- toast message: react-native-toast-message
- ico: @expo/vector-icons

# Expo Setup and Upgrade Guide

This guide will walk you through the installation of the Expo CLI and how to upgrade your Expo SDK to a newer version (specifically for SDK versions greater than 49).

## Table of Contents

- [Installation](#installation)
- [Upgrading Expo SDK](#upgrading-expo-sdk)

## Installation

To get started with Expo, you'll need to install the Expo CLI. This can be achieved using Yarn:

```bash
yarn global add expo-cli
```

> **Note**: Path aliases only work for Expo SDK versions greater than 49.

## Upgrading Expo SDK

If you're working on a project that uses an older version of the Expo SDK and you wish to upgrade to a newer version (greater than or equal to 49.0.0), follow the steps below:

1. **Add the latest version of Expo**:

   ```bash
   yarn add expo@^49.0.0
   ```

2. **Install any required dependencies and fix issues**:

   ```bash
   npx expo install --fix
   ```

3. **Run the Expo Doctor to diagnose and fix any issues**:

   ```bash
   npx expo-doctor@latest
   ```

   Expo Doctor will examine your project files and configuration to help you ensure that everything is correctly set up. If any issues are detected, it will provide you with guidance on how to fix them.

---

# React Native Coding Style Guide

Welcome to our React Native Coding Style Guide. This document provides guidelines to ensure that the codebase remains consistent and easy to understand for all contributors. It is essential to follow these conventions to maintain the clarity and quality of the codebase.

## Table of Contents

- [File and Folder Naming](#file-and-folder-naming)
- [Component Naming](#component-naming)
- [Constants](#constants)
- [Additional Guidelines](#additional-guidelines)

## File and Folder Naming

1. **Folders**:

   - All folder names should be in **lowercase**.
   - If the name consists of multiple words, separate them using hyphens (`-`).
     - Example: `user-profile`, `assets`, `components`.

2. **Files**:
   - File names for React components should be in **CamelCase** with the first letter capitalized.
     - Example: `UserProfile.tsx`, `MainScreen.tsx`.
   - Non-component files should be in **lowercase**.
     - Example: `helpers.js`, `config.js`.

## Component Naming

1. React components must be named in **CamelCase** with the first letter capitalized.

   - Example: `UserProfile`, `SideBar`, `Header`.

2. Inline functional components or components declared within other components should also follow the CamelCase naming convention.
   - Example: `const ListItem = () => {...}`.

## Constants

1. Constant variable names should be in **UPPER_CASE** with underscores separating words.

   - Example: `const API_URL = 'https://api.example.com';`.

2. The values of these constants (if they are strings or other primitive data types) should also be in **UPPER_CASE**.
   - Example: `const STATUS_ACTIVE = 'ACTIVE';`.

## Additional Guidelines

1. **Descriptive Names**: Always choose descriptive names that can provide clarity about the purpose of the variable, function, or component.

2. **Comments**: Comment your code wherever necessary to explain complex logic or decisions made. This helps future developers understand your thought process.

3. **Modularity**: Break down complex components into smaller, reusable sub-components.

4. **ES6 and Beyond**: Use ES6 (and newer) features like arrow functions, destructuring, template literals, and others for cleaner and more concise code.

5. **Formatting**: Ensure you're using a code formatter (like Prettier) and linter (like ESLint) to maintain consistency in code structure and to catch potential bugs or anti-patterns.

---

We believe that adhering to these guidelines will ensure our codebase remains clean, consistent, and easily understandable. If you have suggestions or updates to these guidelines, please raise them with the team.
