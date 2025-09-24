cmake_minimum_required(VERSION 3.10)
project(psv_management)

set(CMAKE_CXX_STANDARD 17)

find_package(Crow CONFIG REQUIRED)
find_package(mongocxx CONFIG REQUIRED)
find_package(jwt-cpp CONFIG REQUIRED)

add_library(psv_lib src/controllers/AuthController.cpp src/controllers/VehicleController.cpp src/controllers/CrewProfileController.cpp src/controllers/RouteController.cpp src/controllers/WelfareController.cpp src/controllers/PayrollController.cpp src/controllers/GPSDataController.cpp src/controllers/EmployeeController.cpp)

target_include_directories(psv_lib PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/src /app/crow_server/build/vcpkg/installed/x64-linux/include/jwt-cpp/traits/kazuho-picojson)

target_link_libraries(psv_lib PUBLIC Crow::Crow $<IF:$<TARGET_EXISTS:mongo::mongocxx_static>,mongo::mongocxx_static,mongo::mongocxx_shared> jwt-cpp::jwt-cpp crypt)

add_executable(psv_management main.cpp)
target_link_libraries(psv_management PRIVATE psv_lib)

enable_testing()

find_package(GTest CONFIG REQUIRED)

add_executable(tests tests.cpp)
target_link_libraries(tests PRIVATE GTest::gtest GTest::gtest_main GTest::gmock GTest::gmock_main psv_lib)
