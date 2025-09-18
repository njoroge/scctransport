#pragma once

#include <string>
#include <vector>
#include <optional>
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>
#include <bsoncxx/oid.hpp>

struct Location {
    double latitude;
    double longitude;
    std::string address;
};

struct Waypoint {
    double latitude;
    double longitude;
    std::string address;
    int order;
};

class Route {
public:
    Route(std::string routeName, Location origin, Location destination, double estimatedDistance, int estimatedDuration, std::string routeType)
        : routeName(routeName), origin(origin), destination(destination), estimatedDistance(estimatedDistance), estimatedDuration(estimatedDuration), routeType(routeType) {}

    bsoncxx::document::value to_bson() const {
        bsoncxx::builder::stream::document builder{};
        builder << "routeName" << routeName
                << "origin" << bsoncxx::builder::stream::open_document
                    << "latitude" << origin.latitude
                    << "longitude" << origin.longitude
                    << "address" << origin.address
                << bsoncxx::builder::stream::close_document
                << "destination" << bsoncxx::builder::stream::open_document
                    << "latitude" << destination.latitude
                    << "longitude" << destination.longitude
                    << "address" << destination.address
                << bsoncxx::builder::stream::close_document
                << "estimatedDistance" << estimatedDistance
                << "estimatedDuration" << estimatedDuration
                << "routeType" << routeType;

        if (!waypoints.empty()) {
            auto waypoints_array = builder << "waypoints" << bsoncxx::builder::stream::open_array;
            for (const auto& waypoint : waypoints) {
                waypoints_array << bsoncxx::builder::stream::open_document
                    << "latitude" << waypoint.latitude
                    << "longitude" << waypoint.longitude
                    << "address" << waypoint.address
                    << "order" << waypoint.order
                << bsoncxx::builder::stream::close_document;
            }
            waypoints_array << bsoncxx::builder::stream::close_array;
        }

        return builder.extract();
    }

private:
    bsoncxx::oid _id;
    std::string routeName;
    Location origin;
    Location destination;
    std::vector<Waypoint> waypoints;
    double estimatedDistance;
    int estimatedDuration;
    std::string routeType;
    std::string status = "Planned";
};
