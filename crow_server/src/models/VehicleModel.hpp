#pragma once

#include <string>
#include <vector>
#include <optional>
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>
#include <bsoncxx/oid.hpp>

class Vehicle {
public:
    Vehicle(std::string numberPlate, std::string vehicleType, std::string logbookNumber, int passengerCapacity, bsoncxx::oid owner)
        : numberPlate(numberPlate), vehicleType(vehicleType), logbookNumber(logbookNumber), passengerCapacity(passengerCapacity), owner(owner) {}

    bsoncxx::document::value to_bson() const {
        bsoncxx::builder::stream::document builder{};
        builder << "numberPlate" << numberPlate
                << "vehicleType" << vehicleType
                << "logbookNumber" << logbookNumber
                << "passengerCapacity" << passengerCapacity
                << "owner" << owner;

        if (!nickname.empty()) builder << "nickname" << nickname;
        if (this->driver) builder << "driver" << *this->driver;
        if (!conductors.empty()) {
            auto conductors_array = builder << "conductors" << bsoncxx::builder::stream::open_array;
            for (const auto& conductor : conductors) {
                conductors_array << conductor;
            }
            conductors_array << bsoncxx::builder::stream::close_array;
        }
        if (!routes.empty()) {
            auto routes_array = builder << "routes" << bsoncxx::builder::stream::open_array;
            for (const auto& route : routes) {
                routes_array << route;
            }
            routes_array << bsoncxx::builder::stream::close_array;
        }

        return builder.extract();
    }

private:
    bsoncxx::oid _id;
    std::string numberPlate;
    std::string vehicleType;
    std::string logbookNumber;
    int passengerCapacity;
    bsoncxx::oid owner;
    std::string nickname;
    std::optional<bsoncxx::oid> driver;
    std::vector<bsoncxx::oid> conductors;
    std::vector<bsoncxx::oid> routes;
    std::string status = "Inactive";
    // Skipping inspectionDetails, insuranceDetails, ntsaRequirements for brevity
};
