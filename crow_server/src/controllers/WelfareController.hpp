#pragma once

#include "crow.h"
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>

class WelfareController {
public:
    WelfareController(mongocxx::database db) : db(db) {}

    crow::response recordContribution(const crow::request& req);
    crow::response getAllContributions(const crow::request& req);
    crow::response getMemberContributions(const crow::request& req, const std::string& userId);
    crow::response getContributionById(const crow::request& req, const std::string& id);
    crow::response updateContribution(const crow::request& req, const std::string& id);
    crow::response deleteContribution(const crow::request& req, const std::string& id);

private:
    mongocxx::database db;
};
