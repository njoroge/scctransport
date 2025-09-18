#include "crow.h"
#include "controllers/AuthController.hpp"
#include "controllers/VehicleController.hpp"
#include "controllers/CrewProfileController.hpp"
#include "controllers/RouteController.hpp"
#include "controllers/WelfareController.hpp"
#include "controllers/PayrollController.hpp"
#include "controllers/GPSDataController.hpp"
#include "controllers/EmployeeController.hpp"
#include <mongocxx/instance.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/uri.hpp>

int main()
{
    // Initialize mongocxx instance
    mongocxx::instance instance{};
    mongocxx::uri uri("mongodb://localhost:27017");
    mongocxx::client client(uri);
    mongocxx::database db = client["psv_management"];

    // Initialize controllers
    AuthController authController(db);
    VehicleController vehicleController(db);
    CrewProfileController crewProfileController(db);
    RouteController routeController(db);
    WelfareController welfareController(db);
    PayrollController payrollController(db);
    GPSDataController gpsDataController(db);
    EmployeeController employeeController(db);

    crow::SimpleApp app;

    // Auth routes
    CROW_ROUTE(app, "/api/users/register").methods("POST"_method)
    ([&authController](const crow::request& req){
        return authController.registerUser(req);
    });

    CROW_ROUTE(app, "/api/users/login").methods("POST"_method)
    ([&authController](const crow::request& req){
        return authController.loginUser(req);
    });

    // Vehicle routes
    CROW_ROUTE(app, "/api/vehicles").methods("POST"_method)
    ([&vehicleController](const crow::request& req){
        return vehicleController.registerVehicle(req);
    });

    CROW_ROUTE(app, "/api/vehicles").methods("GET"_method)
    ([&vehicleController](const crow::request& req){
        return vehicleController.getAllVehicles(req);
    });

    CROW_ROUTE(app, "/api/vehicles/<string>").methods("GET"_method)
    ([&vehicleController](const crow::request& req, std::string id){
        return vehicleController.getVehicleById(req, id);
    });

    CROW_ROUTE(app, "/api/vehicles/<string>").methods("PUT"_method)
    ([&vehicleController](const crow::request& req, std::string id){
        return vehicleController.updateVehicle(req, id);
    });

    CROW_ROUTE(app, "/api/vehicles/<string>").methods("DELETE"_method)
    ([&vehicleController](const crow::request& req, std::string id){
        return vehicleController.deleteVehicle(req, id);
    });

    // Crew profile routes
    CROW_ROUTE(app, "/api/crew-profiles").methods("POST"_method)
    ([&crewProfileController](const crow::request& req){
        return crewProfileController.createCrewProfile(req);
    });

    CROW_ROUTE(app, "/api/crew-profiles").methods("GET"_method)
    ([&crewProfileController](const crow::request& req){
        return crewProfileController.getAllCrewProfiles(req);
    });

    CROW_ROUTE(app, "/api/crew-profiles/<string>").methods("GET"_method)
    ([&crewProfileController](const crow::request& req, std::string userId){
        return crewProfileController.getCrewProfileByUserId(req, userId);
    });

    CROW_ROUTE(app, "/api/crew-profiles/<string>").methods("PUT"_method)
    ([&crewProfileController](const crow::request& req, std::string userId){
        return crewProfileController.updateCrewProfile(req, userId);
    });

    CROW_ROUTE(app, "/api/crew-profiles/<string>").methods("DELETE"_method)
    ([&crewProfileController](const crow::request& req, std::string userId){
        return crewProfileController.deleteCrewProfile(req, userId);
    });

    // Route routes
    CROW_ROUTE(app, "/api/routes").methods("POST"_method)
    ([&routeController](const crow::request& req){
        return routeController.defineNewRoute(req);
    });

    CROW_ROUTE(app, "/api/routes").methods("GET"_method)
    ([&routeController](const crow::request& req){
        return routeController.getAllRoutes(req);
    });

    CROW_ROUTE(app, "/api/routes/<string>").methods("GET"_method)
    ([&routeController](const crow::request& req, std::string idOrName){
        return routeController.getRouteByIdOrName(req, idOrName);
    });

    CROW_ROUTE(app, "/api/routes/<string>").methods("PUT"_method)
    ([&routeController](const crow::request& req, std::string idOrName){
        return routeController.updateRoute(req, idOrName);
    });

    CROW_ROUTE(app, "/api/routes/<string>").methods("DELETE"_method)
    ([&routeController](const crow::request& req, std::string idOrName){
        return routeController.deleteRoute(req, idOrName);
    });

    // Welfare routes
    CROW_ROUTE(app, "/api/welfare/contributions").methods("POST"_method)
    ([&welfareController](const crow::request& req){
        return welfareController.recordContribution(req);
    });

    CROW_ROUTE(app, "/api/welfare/contributions").methods("GET"_method)
    ([&welfareController](const crow::request& req){
        return welfareController.getAllContributions(req);
    });

    CROW_ROUTE(app, "/api/welfare/contributions/member/<string>").methods("GET"_method)
    ([&welfareController](const crow::request& req, std::string userId){
        return welfareController.getMemberContributions(req, userId);
    });

    CROW_ROUTE(app, "/api/welfare/contributions/<string>").methods("GET"_method)
    ([&welfareController](const crow::request& req, std::string id){
        return welfareController.getContributionById(req, id);
    });

    CROW_ROUTE(app, "/api/welfare/contributions/<string>").methods("PUT"_method)
    ([&welfareController](const crow::request& req, std::string id){
        return welfareController.updateContribution(req, id);
    });

    CROW_ROUTE(app, "/api/welfare/contributions/<string>").methods("DELETE"_method)
    ([&welfareController](const crow::request& req, std::string id){
        return welfareController.deleteContribution(req, id);
    });

    // Payroll routes
    CROW_ROUTE(app, "/api/payroll/records").methods("POST"_method)
    ([&payrollController](const crow::request& req){
        return payrollController.createPayrollRecord(req);
    });

    CROW_ROUTE(app, "/api/payroll/records").methods("GET"_method)
    ([&payrollController](const crow::request& req){
        return payrollController.getAllPayrollRecords(req);
    });

    CROW_ROUTE(app, "/api/payroll/records/crew/<string>").methods("GET"_method)
    ([&payrollController](const crow::request& req, std::string userId){
        return payrollController.getCrewMemberPayrollRecords(req, userId);
    });

    CROW_ROUTE(app, "/api/payroll/records/<string>").methods("GET"_method)
    ([&payrollController](const crow::request& req, std::string id){
        return payrollController.getPayrollRecordById(req, id);
    });

    CROW_ROUTE(app, "/api/payroll/records/<string>").methods("PUT"_method)
    ([&payrollController](const crow::request& req, std::string id){
        return payrollController.updatePayrollRecord(req, id);
    });

    // GPS data routes
    CROW_ROUTE(app, "/api/gps-data").methods("POST"_method)
    ([&gpsDataController](const crow::request& req){
        return gpsDataController.submitGPSData(req);
    });

    CROW_ROUTE(app, "/api/gps-data/latest").methods("GET"_method)
    ([&gpsDataController](const crow::request& req){
        return gpsDataController.getLatestGpsData(req);
    });

    CROW_ROUTE(app, "/api/gps-data/<string>").methods("GET"_method)
    ([&gpsDataController](const crow::request& req, std::string vehicleId){
        return gpsDataController.getGpsDataForVehicle(req, vehicleId);
    });

    // Employee routes
    CROW_ROUTE(app, "/api/employees").methods("POST"_method)
    ([&employeeController](const crow::request& req){
        return employeeController.createEmployee(req);
    });

    CROW_ROUTE(app, "/api/employees").methods("GET"_method)
    ([&employeeController](const crow::request& req){
        return employeeController.getEmployees(req);
    });

    CROW_ROUTE(app, "/api/employees/<string>").methods("PUT"_method)
    ([&employeeController](const crow::request& req, std::string id){
        return employeeController.updateEmployee(req, id);
    });

    app.port(18080).multithreaded().run();
}
