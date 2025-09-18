#pragma once

#include "crow.h"
#include "models/UserModel.hpp"
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>

class AuthController {
public:
    AuthController(mongocxx::database db) : db(db) {}

    crow::response registerUser(const crow::request& req);
    crow::response loginUser(const crow::request& req);

private:
    mongocxx::database db;
};
