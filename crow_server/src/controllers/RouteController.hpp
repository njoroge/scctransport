#pragma once

#include "crow.h"
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>

class RouteController {
public:
    RouteController(mongocxx::database db) : db(db) {}

    crow::response defineNewRoute(const crow::request& req);
    crow::response getAllRoutes(const crow::request& req);
    crow::response getRouteByIdOrName(const crow::request& req, const std::string& idOrName);
    crow::response updateRoute(const crow::request& req, const std::string& idOrName);
    crow::response deleteRoute(const crow::request& req, const std::string& idOrName);

private:
    mongocxx::database db;
};
