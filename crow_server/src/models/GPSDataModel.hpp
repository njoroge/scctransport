#pragma once

#include <string>
#include <vector>
#include <optional>
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>
#include <bsoncxx/oid.hpp>
#include <bsoncxx/types.hpp>

class GPSData {
public:
    GPSData(bsoncxx::oid vehicleId, double latitude, double longitude)
        : vehicleId(vehicleId), latitude(latitude), longitude(longitude) {}

    bsoncxx::document::value to_bson() const {
        bsoncxx::builder::stream::document builder{};
        builder << "vehicleId" << vehicleId
                << "latitude" << latitude
                << "longitude" << longitude;

        if (speed) builder << "speed" << *speed;
        if (heading) builder << "heading" << *heading;

        return builder.extract();
    }

private:
    bsoncxx::oid _id;
    bsoncxx::oid vehicleId;
    double latitude;
    double longitude;
    std::optional<double> speed;
    std::optional<double> heading;
};
