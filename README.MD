# MenuAR

Interactive WebAR restaurant menu built as a software development portfolio project.

MenuAR explores how augmented reality can transform a traditional restaurant menu into an interactive 3D experience directly in the mobile browser, without requiring a native application.

## Project Status

🚧 In Development

The project is currently in the initial development phase.

## Concept

The intended user experience is:

QR Code → Digital Menu → Select a Dish → View in AR → Scan Menu Target → Interactive 3D Model

The initial demonstration restaurant is **SANTO BURGER**, a fictional restaurant created for this project.

## Goals

- Build a mobile-first digital restaurant menu.
- Display optimized 3D food models in the browser.
- Implement image-tracking WebAR.
- Allow customers to visualize dishes in augmented reality.
- Keep the experience accessible without installing a native application.
- Deploy the MVP using free hosting services.

## Technology Stack

- HTML5
- CSS3
- JavaScript
- ASP.NET Core
- A-Frame
- MindAR
- Three.js
- WebGL
- glTF / GLB

## 3D Assets

The project uses optimized GLB models designed for mobile WebAR.

Current primary asset:

`SantoBurger_AR_meshopt_v01.glb`

## Development Environment

- Visual Studio 2022
- .NET
- Git
- GitHub

## Cost

The project is being developed with a **$0 budget**, using free and open-source technologies whenever possible.

## Project Structure

```text
MenuAR/
├── .gitignore
├── README.md
│
└── MenuAR.web/
    ├── Program.cs
    ├── appsettings.json
    └── wwwroot/
        ├── css/
        ├── js/
        └── assets/
            ├── models/
            ├── targets/
            └── images/
```
