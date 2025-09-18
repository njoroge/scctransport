#include <gtest/gtest.h>
#include "controllers/AuthController.hpp"
#include <mongocxx/instance.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/uri.hpp>

class AuthTest : public ::testing::Test {
protected:
    static void SetUpTestSuite() {
        mongocxx::instance::current();
    }

    void SetUp() override {
        mongocxx::uri uri("mongodb://localhost:27017");
        client = mongocxx::client(uri);
        db = client["test_psv_management"];
    }

    void TearDown() override {
        db["users"].delete_many({});
    }

    mongocxx::client client;
    mongocxx::database db;
};

TEST_F(AuthTest, RegisterUser) {
    AuthController authController(db);

    crow::request req;
    req.method = "POST"_method;
    req.body = R"({"name":"testuser", "email":"test@example.com", "password":"password", "role":"sacco_member", "memberId":"12345", "phoneNumber":"1234567890"})";

    auto res = authController.registerUser(req);

    EXPECT_EQ(res.code, 201);
}

TEST_F(AuthTest, LoginUser) {
    AuthController authController(db);

    // First, register a user
    crow::request register_req;
    register_req.method = "POST"_method;
    register_req.body = R"({"name":"testuser", "email":"test@example.com", "password":"password", "role":"sacco_member", "memberId":"12345", "phoneNumber":"1234567890"})";
    authController.registerUser(register_req);

    // Then, try to login
    crow::request login_req;
    login_req.method = "POST"_method;
    login_req.body = R"({"email":"test@example.com", "password":"password"})";

    auto res = authController.loginUser(login_req);

    EXPECT_EQ(res.code, 200);
}

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
