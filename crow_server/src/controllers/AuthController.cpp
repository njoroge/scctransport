#include "AuthController.hpp"
#include "jwt-cpp/jwt.h"
#include <defaults.h>
#include "models/UserModel.hpp"
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/exception/exception.hpp>

// In a real application, you would use a proper password hashing library like bcrypt.
// For simplicity, we will just store passwords in plaintext.
std::string hash_password(const std::string& password) {
    return password;
}

bool verify_password(const std::string& password, const std::string& hash) {
    return password == hash;
}

std::string generate_token(const std::string& user_id, const std::string& role) {
    auto token = jwt::create()
        .set_issuer("auth0")
        .set_type("JWS")
        .set_payload_claim("user_id", jwt::claim(user_id))
        .set_payload_claim("role", jwt::claim(role))
        .sign(jwt::algorithm::hs256{"secret"});
    return token;
}

crow::response AuthController::registerUser(const crow::request& req) {
    auto body = crow::json::load(req.body);
    if (!body) {
        return crow::response(400);
    }

    std::string name = body["name"].s();
    std::string email = body["email"].s();
    std::string password = body["password"].s();
    std::string role = body["role"].s();
    std::string memberId = body["memberId"].s();
    std::string phoneNumber = body["phoneNumber"].s();

    if (name.empty() || email.empty() || password.empty()) {
        return crow::response(400, "Please provide name, email, and password.");
    }

    auto collection = db["users"];
    auto existing_user = collection.find_one(bsoncxx::builder::stream::document{} << "email" << email << bsoncxx::builder::stream::finalize);
    if (existing_user) {
        return crow::response(400, "User already exists with this email.");
    }

    std::string hashedPassword = hash_password(password);
    User new_user(name, email, hashedPassword, role, memberId, phoneNumber);

    try {
        collection.insert_one(new_user.to_bson());
    } catch (const mongocxx::exception& e) {
        return crow::response(500, e.what());
    }

    crow::json::wvalue res;
    res["message"] = "User registered successfully";
    return crow::response(201, res);
}

crow::response AuthController::loginUser(const crow::request& req) {
    auto body = crow::json::load(req.body);
    if (!body) {
        return crow::response(400);
    }

    std::string email = body["email"].s();
    std::string password = body["password"].s();

    if (email.empty() || password.empty()) {
        return crow::response(400, "Please provide email and password.");
    }

    auto collection = db["users"];
    auto user_doc = collection.find_one(bsoncxx::builder::stream::document{} << "email" << email << bsoncxx::builder::stream::finalize);

    if (!user_doc) {
        return crow::response(401, "Invalid email or password.");
    }

    auto user_view = user_doc->view();
    std::string stored_password = std::string(user_view["password"].get_string().value);

    if (!verify_password(password, stored_password)) {
        return crow::response(401, "Invalid email or password.");
    }

    std::string user_id = user_view["_id"].get_oid().value.to_string();
    std::string role = std::string(user_view["role"].get_string().value);
    std::string token = generate_token(user_id, role);

    crow::json::wvalue res;
    res["token"] = token;
    return crow::response(200, res);
}
