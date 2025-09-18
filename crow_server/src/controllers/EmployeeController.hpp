#pragma once

#include "crow.h"
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>

class EmployeeController {
public:
    EmployeeController(mongocxx::database db) : db(db) {}

    crow::response createEmployee(const crow::request& req);
    crow::response getEmployees(const crow::request& req);
    crow::response updateEmployee(const crow::request& req, const std::string& id);

private:
    mongocxx::database db;
};
