#pragma once

#include "crow.h"
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>

class CrewProfileController {
public:
    CrewProfileController(mongocxx::database db) : db(db) {}

    crow::response createCrewProfile(const crow::request& req);
    crow::response getAllCrewProfiles(const crow::request& req);
    crow::response getCrewProfileByUserId(const crow::request& req, const std::string& userId);
    crow::response updateCrewProfile(const crow::request& req, const std::string& userId);
    crow::response deleteCrewProfile(const crow::request& req, const std::string& userId);

private:
    mongocxx::database db;
};
