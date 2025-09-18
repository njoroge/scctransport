#pragma once

#include "crow.h"
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>

class VehicleController {
public:
    VehicleController(mongocxx::database db) : db(db) {}

    crow::response registerVehicle(const crow::request& req);
    crow::response getAllVehicles(const crow::request& req);
    crow::response getVehicleById(const crow::request& req, const std::string& id);
    crow::response updateVehicle(const crow::request& req, const std::string& id);
    crow::response deleteVehicle(const crow::request& req, const std::string& id);

private:
    mongocxx::database db;
};
