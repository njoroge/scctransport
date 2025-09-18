#pragma once

#include <string>
#include <vector>
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>
#include <bsoncxx/oid.hpp>

class User {
public:
    User(std::string name, std::string email, std::string password, std::string role, std::string memberId, std::string phoneNumber)
        : name(name), email(email), password(password), role(role), memberId(memberId), phoneNumber(phoneNumber) {}

    bsoncxx::document::value to_bson() const {
        bsoncxx::builder::stream::document builder{};
        builder << "name" << name
                << "email" << email
                << "password" << password
                << "role" << role
                << "memberId" << memberId
                << "phoneNumber" << phoneNumber
                << "isActive" << isActive;
        return builder.extract();
    }

private:
    bsoncxx::oid _id;
    std::string name;
    std::string email;
    std::string password;
    std::string role = "sacco_member";
    std::string memberId;
    std::string phoneNumber;
    bool isActive = true;
};
