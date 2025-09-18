#pragma once

#include "crow.h"
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>

class PayrollController {
public:
    PayrollController(mongocxx::database db) : db(db) {}

    crow::response createPayrollRecord(const crow::request& req);
    crow::response getAllPayrollRecords(const crow::request& req);
    crow::response getCrewMemberPayrollRecords(const crow::request& req, const std::string& userId);
    crow::response getPayrollRecordById(const crow::request& req, const std::string& id);
    crow::response updatePayrollRecord(const crow::request& req, const std::string& id);

private:
    mongocxx::database db;
};
