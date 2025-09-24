# PSV Management App

This is a web application for managing Public Service Vehicles (PSVs). It consists of a C++ backend built with the Crow framework and a React frontend.

## Backend (C++ Crow)

The backend is a C++ application built with the [Crow](https://crowcpp.org/) framework. It uses MongoDB as the database.

### Prerequisites

- C++17 compiler (e.g., GCC, Clang)
- [CMake](https://cmake.org/) (version 3.10 or higher)
- [vcpkg](https://github.com/microsoft/vcpkg)

### Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies using vcpkg:**

    ```bash
    cd crow_server
    ./vcpkg/vcpkg install
    ```

    This will install all the required C++ libraries, including Crow, the MongoDB C++ driver, and GTest.

### Build

1.  **Create a build directory:**

    ```bash
    mkdir build
    cd build
    ```

2.  **Run CMake:**

    ```bash
    cmake .. -DCMAKE_TOOLCHAIN_FILE=../vcpkg/scripts/buildsystems/vcpkg.cmake
    ```

3.  **Run Make:**

    ```bash
    make
    ```

### Run

1.  **Start the MongoDB server:**

    ```bash
    sudo systemctl start mongod
    ```

2.  **Set the JWT_SECRET environment variable:**

    ```bash
    export JWT_SECRET=my_super_secret_key
    ```

3.  **Run the backend server:**

    ```bash
    ./psv_management
    ```

    The server will start on `http://localhost:18080`.

### Tests

1.  **Run the tests:**

    ```bash
    ./tests
    ```

## Frontend (React)

The frontend is a React application bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the `client` directory, you can run:

#### `npm install`

Installs the required dependencies for the client application.

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
