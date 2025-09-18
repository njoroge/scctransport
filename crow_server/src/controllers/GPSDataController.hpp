#pragma once

#include "crow.h"
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>

class GPSDataController {
public:
    GPSDataController(mongocxx::database db) : db(db) {}

    crow::response submitGPSData(const crow::request& req);
    crow::response getLatestGpsData(const crow::request& req);
    crow::response getGpsDataForVehicle(const crow::request& req, const std::string& vehicleId);

private:
    mongocxx::database db;
};
