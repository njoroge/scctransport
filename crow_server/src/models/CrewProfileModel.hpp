#pragma once

#include <string>
#include <vector>
#include <optional>
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>
#include <bsoncxx/oid.hpp>

class CrewProfile {
public:
    CrewProfile(bsoncxx::oid user, std::string psvLicenseNumber, std::string nationalId, std::string phoneNumber)
        : user(user), psvLicenseNumber(psvLicenseNumber), nationalId(nationalId), phoneNumber(phoneNumber) {}

    bsoncxx::document::value to_bson() const {
        bsoncxx::builder::stream::document builder{};
        builder << "user" << user
                << "psvLicenseNumber" << psvLicenseNumber
                << "nationalId" << nationalId
                << "phoneNumber" << phoneNumber;

        return builder.extract();
    }

private:
    bsoncxx::oid _id;
    bsoncxx::oid user;
    std::string psvLicenseNumber;
    std::string nationalId;
    std::string phoneNumber;
};
